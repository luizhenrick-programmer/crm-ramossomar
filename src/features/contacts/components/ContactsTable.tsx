// src/features/contacts/components/ContactsTable.tsx
import { useState, useMemo } from 'react';
import { useContacts, useDeleteContact } from '../../../hooks/useHierarchy';
import { RoleBadge } from '../../../components/Badge';
import { ContactModal } from './ContactModal';
import type { IContact } from '../types';
import type { Role } from '../../auth/types';
import { ROLE_LABELS } from '../../auth/types';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  Search, UserPlus, Pencil, Trash2,
  ChevronLeft, ChevronRight, Loader2, Users,
  Filter,
} from 'lucide-react';
import { maskCPF, maskPhone } from '../../../utils/masks';

const PAGE_SIZE = 10;

function formatCPF(raw: string) {
  return maskCPF(raw.replace(/\D/g, ''));
}
function formatPhone(raw: string) {
  return maskPhone(raw.replace(/\D/g, ''));
}

export function ContactsTable() {
  const { data: contacts = [], isLoading, isError } = useContacts();
  const deleteMutation = useDeleteContact();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<IContact | null>(null);

  // Filtra ativos + busca + role
  const filtered = useMemo(() => {
    return contacts
      .filter((c) => c.isActive)
      .filter((c) => {
        if (roleFilter !== 'all' && c.role !== roleFilter) return false;
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.cpf.includes(q.replace(/\D/g, '')) ||
          (c.zone ?? '').toLowerCase().includes(q) ||
          (c.email ?? '').toLowerCase().includes(q)
        );
      });
  }, [contacts, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openCreate() {
    setEditContact(null);
    setModalOpen(true);
  }

  function openEdit(c: IContact) {
    setEditContact(c);
    setModalOpen(true);
  }

  function handleDelete(c: IContact) {
    if (window.confirm(`Remover "${c.name}" do sistema?`)) {
      deleteMutation.mutate(c.id);
    }
  }

  // ─── Loading State ───
  if (isLoading) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 44, borderRadius: 8 }} />
        ))}
      </div>
    );
  }

  // ─── Error State ───
  if (isError) {
    return (
      <div className="empty-state">
        <span style={{ fontSize: '2rem' }}>⚠️</span>
        <p>Erro ao carregar cadastros.</p>
      </div>
    );
  }

  return (
    <>
      <div className="card" style={{ padding: 0 }}>
        {/* ─── Toolbar ─── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '20px 24px',
            borderBottom: '1px solid var(--surface-border)',
            flexWrap: 'wrap',
          }}
        >
          {/* Busca */}
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={16} className="search-icon" />
            <input
              className="form-input"
              style={{ paddingLeft: 40 }}
              placeholder="Buscar por nome, CPF, zona..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              id="contacts-search"
            />
          </div>

          {/* Filtro por role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              className="form-input"
              style={{ width: 'auto', paddingRight: 36 }}
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value as Role | 'all'); setPage(1); }}
              id="contacts-role-filter"
            >
              <option value="all">Todos os Níveis</option>
              {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
          </div>

          {/* Total */}
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              flexShrink: 0,
              background: 'var(--surface-input)',
              padding: '4px 10px',
              borderRadius: 99,
            }}
          >
            {filtered.length} cadastro{filtered.length !== 1 ? 's' : ''}
          </span>

          {/* Botão novo cadastro */}
          <button
            className="btn btn-primary btn-sm"
            onClick={openCreate}
            id="btn-new-contact"
            style={{ flexShrink: 0 }}
          >
            <UserPlus size={15} />
            Novo Cadastro
          </button>
        </div>

        {/* ─── Table ─── */}
        {pageItems.length === 0 ? (
          <div className="empty-state" style={{ padding: '48px 24px' }}>
            <Users size={40} color="var(--text-muted)" />
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
              {search || roleFilter !== 'all' ? 'Nenhum resultado encontrado' : 'Nenhum cadastro ainda'}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {search || roleFilter !== 'all'
                ? 'Tente ajustar os filtros'
                : 'Clique em "Novo Cadastro" para adicionar'}
            </p>
          </div>
        ) : (
          <div className="table-container" style={{ borderRadius: 0, border: 'none' }}>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Nível</th>
                  <th>Zona / Região</th>
                  <th>Cadastrado em</th>
                  <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((contact) => (
                  <tr key={contact.id} className="anim-fade-in">
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Avatar */}
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            color: '#fff',
                            flexShrink: 0,
                          }}
                        >
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {contact.name}
                          </div>
                          {contact.email && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {contact.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {formatCPF(contact.cpf)}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {formatPhone(contact.phone)}
                    </td>
                    <td>
                      <RoleBadge role={contact.role} />
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {contact.zone || (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>—</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => openEdit(contact)}
                          title="Editar"
                          style={{ padding: 6 }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(contact)}
                          title="Remover"
                          style={{ padding: 6 }}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending && deleteMutation.variables === contact.id
                            ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                            : <Trash2 size={14} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 24px',
              borderTop: '1px solid var(--surface-border)',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Página {page} de {totalPages}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editContact={editContact}
      />
    </>
  );
}
