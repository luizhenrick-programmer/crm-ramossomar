// src/features/contacts/components/ContactForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactSchema } from '../schemas/contactSchema';
import { maskCPF, maskPhone, maskCEP, cleanDigits } from '../../../utils/masks';
import { useAuth } from '../../auth/hooks/useAuth';
import { ROLE_LABELS, ROLES_CAN_CREATE, type Role } from '../../auth/types';
import type { IContact } from '../types';
import type { ViaCEPResponse } from '../types';
import {
  User, Phone, Mail, FileText, MapPin,
  Hash, Building2, Map, Loader2, AlertCircle,
} from 'lucide-react';

interface ContactFormProps {
  onSubmit: (data: ContactSchema) => void;
  isLoading: boolean;
  defaultValues?: Partial<IContact>;
}

export function ContactForm({ onSubmit, isLoading, defaultValues }: ContactFormProps) {
  const { user } = useAuth();
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  // Determina os roles que este usuário pode cadastrar
  const creatableRoles: Role[] = user ? ROLES_CAN_CREATE[user.role] : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          cpf: defaultValues.cpf,
          phone: defaultValues.phone,
          email: defaultValues.email,
          role: defaultValues.role,
          parent_id: defaultValues.parent_id,
          zone: defaultValues.zone,
          address: defaultValues.address,
        }
      : {
          role: creatableRoles[0] ?? 'cabo_eleitoral',
          parent_id: user?.id ?? null,
        },
  });

  // =============================================
  // Busca ViaCEP ao atingir 8 dígitos
  // =============================================
  const cepValue = watch('address.cep');

  useEffect(() => {
    const raw = cleanDigits(cepValue ?? '');
    if (raw.length !== 8) return;

    setCepLoading(true);
    setCepError('');

    fetch(`https://viacep.com.br/ws/${raw}/json/`)
      .then((r) => r.json())
      .then((data: ViaCEPResponse) => {
        if (data.erro) {
          setCepError('CEP não encontrado');
          return;
        }
        setValue('address.logradouro', data.logradouro, { shouldValidate: true });
        setValue('address.bairro', data.bairro, { shouldValidate: true });
        setValue('address.cidade', data.localidade, { shouldValidate: true });
        setValue('address.uf', data.uf, { shouldValidate: true });
      })
      .catch(() => setCepError('Erro ao buscar CEP'))
      .finally(() => setCepLoading(false));
  }, [cepValue, setValue]);

  // =============================================
  // Aplica máscaras nos campos controlados
  // =============================================
  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = maskCPF(e.target.value);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = maskPhone(e.target.value);
  }

  function handleCEPChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.value = maskCEP(e.target.value);
  }

  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.03em', textTransform: 'uppercase' as const };
  const iconStyle = { color: 'var(--text-muted)', flexShrink: 0 };
  const inputWrap = { position: 'relative' as const, display: 'flex', flexDirection: 'column' as const, gap: 6 };

  function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null;
    return (
      <span className="form-error">
        <AlertCircle size={12} />
        {msg}
      </span>
    );
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── DADOS PESSOAIS ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <User size={16} color="var(--brand-primary-light)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dados Pessoais
          </span>
        </div>

        {/* Nome */}
        <div className="form-group" style={{ marginBottom: 14 }}>
          <label className="form-label" htmlFor="name">Nome Completo *</label>
          <input
            id="name"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="Ex: João da Silva"
            {...register('name')}
          />
          <FieldError msg={errors.name?.message} />
        </div>

        <div className="form-grid form-grid-2" style={{ gap: 14 }}>
          {/* CPF */}
          <div className="form-group">
            <label className="form-label" htmlFor="cpf">CPF *</label>
            <input
              id="cpf"
              className={`form-input${errors.cpf ? ' error' : ''}`}
              placeholder="000.000.000-00"
              maxLength={14}
              {...register('cpf', {
                onChange: handleCPFChange,
              })}
            />
            <FieldError msg={errors.cpf?.message} />
          </div>

          {/* Telefone */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Telefone / WhatsApp *</label>
            <input
              id="phone"
              className={`form-input${errors.phone ? ' error' : ''}`}
              placeholder="(00) 00000-0000"
              maxLength={15}
              {...register('phone', {
                onChange: handlePhoneChange,
              })}
            />
            <FieldError msg={errors.phone?.message} />
          </div>
        </div>

        {/* E-mail */}
        <div className="form-group" style={{ marginTop: 14 }}>
          <label className="form-label" htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            className={`form-input${errors.email ? ' error' : ''}`}
            placeholder="email@exemplo.com (opcional)"
            {...register('email')}
          />
          <FieldError msg={errors.email?.message} />
        </div>
      </div>

      {/* ── DADOS POLÍTICOS ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <FileText size={16} color="var(--brand-accent)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dados Políticos
          </span>
        </div>

        <div className="form-grid form-grid-2" style={{ gap: 14 }}>
          {/* Nível */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">Nível Hierárquico *</label>
            <select
              id="role"
              className={`form-input${errors.role ? ' error' : ''}`}
              {...register('role')}
              disabled={creatableRoles.length <= 1}
            >
              {creatableRoles.length === 0 ? (
                <option value="">Sem permissão para cadastrar</option>
              ) : (
                creatableRoles.map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))
              )}
            </select>
            <FieldError msg={errors.role?.message} />
          </div>

          {/* Zona */}
          <div className="form-group">
            <label className="form-label" htmlFor="zone">Zona / Região</label>
            <input
              id="zone"
              className="form-input"
              placeholder="Ex: Zona Norte, Bairro X"
              {...register('zone')}
            />
          </div>
        </div>
      </div>

      {/* ── ENDEREÇO ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <MapPin size={16} color="#f59e0b" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Endereço
          </span>
        </div>

        {/* CEP */}
        <div className="form-group" style={{ marginBottom: 14 }}>
          <label className="form-label" htmlFor="cep">CEP *</label>
          <div style={{ position: 'relative' }}>
            <input
              id="cep"
              className={`form-input${errors.address?.cep ? ' error' : ''}`}
              placeholder="00000-000"
              maxLength={9}
              style={{ paddingRight: 40 }}
              {...register('address.cep', {
                onChange: handleCEPChange,
              })}
            />
            {cepLoading && (
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--brand-primary-light)',
                  display: 'flex',
                }}
              >
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              </span>
            )}
          </div>
          {cepError && <span className="form-error"><AlertCircle size={12}/>{cepError}</span>}
          <FieldError msg={errors.address?.cep?.message} />
          <span className="form-hint">Preenchimento automático ao digitar o CEP</span>
        </div>

        <div className="form-grid" style={{ gridTemplateColumns: '1fr auto', gap: 14, marginBottom: 14 }}>
          {/* Logradouro */}
          <div className="form-group">
            <label className="form-label" htmlFor="logradouro">Logradouro *</label>
            <input
              id="logradouro"
              className={`form-input${errors.address?.logradouro ? ' error' : ''}`}
              placeholder="Preenchido automaticamente"
              {...register('address.logradouro')}
            />
            <FieldError msg={errors.address?.logradouro?.message} />
          </div>
          {/* Número */}
          <div className="form-group" style={{ width: 90 }}>
            <label className="form-label" htmlFor="numero">Nº *</label>
            <input
              id="numero"
              className={`form-input${errors.address?.numero ? ' error' : ''}`}
              placeholder="Nº"
              {...register('address.numero')}
            />
            <FieldError msg={errors.address?.numero?.message} />
          </div>
        </div>

        {/* Complemento */}
        <div className="form-group" style={{ marginBottom: 14 }}>
          <label className="form-label" htmlFor="complemento">Complemento</label>
          <input
            id="complemento"
            className="form-input"
            placeholder="Apto, bloco, casa... (opcional)"
            {...register('address.complemento')}
          />
        </div>

        <div className="form-grid form-grid-3" style={{ gap: 14 }}>
          {/* Bairro */}
          <div className="form-group">
            <label className="form-label" htmlFor="bairro">Bairro *</label>
            <input
              id="bairro"
              className={`form-input${errors.address?.bairro ? ' error' : ''}`}
              placeholder="Bairro"
              {...register('address.bairro')}
            />
            <FieldError msg={errors.address?.bairro?.message} />
          </div>
          {/* Cidade */}
          <div className="form-group">
            <label className="form-label" htmlFor="cidade">Cidade *</label>
            <input
              id="cidade"
              className={`form-input${errors.address?.cidade ? ' error' : ''}`}
              placeholder="Cidade"
              {...register('address.cidade')}
            />
            <FieldError msg={errors.address?.cidade?.message} />
          </div>
          {/* UF */}
          <div className="form-group">
            <label className="form-label" htmlFor="uf">UF *</label>
            <input
              id="uf"
              className={`form-input${errors.address?.uf ? ' error' : ''}`}
              placeholder="SP"
              maxLength={2}
              style={{ textTransform: 'uppercase' }}
              {...register('address.uf')}
            />
            <FieldError msg={errors.address?.uf?.message} />
          </div>
        </div>
      </div>

      {/* Spinner keyframe inline */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
