// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { DEMO_USERS } from '../../../lib/mock-data';
import { ROLE_LABELS, type Role } from '../types';
import { Shield, Mail, Lock, LogIn, Loader2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const ROLE_COLORS: Record<Role, string> = {
  admin: '#a855f7',
  coord_geral: '#3b82f6',
  coord_regional: '#06b6d4',
  lideranca: '#10b981',
  cabo_eleitoral: '#f59e0b',
};

export function LoginPage() {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { toast.error('Informe o e-mail'); return; }
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Bem-vindo de volta!');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || 'Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  }

  function handleDemoLogin(userId: string) {
    loginAsDemo(userId);
    toast.success('Acesso demo ativado!');
    navigate('/');
  }

  return (
    <div className="login-page">
      <div className="login-panel anim-fade-in">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 32px rgba(26,86,232,0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          >
            <Shield size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 6 }}>
            CRM Ramos Soares
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Sistema de Gestão Política
          </p>
        </div>

        {/* Card de Login */}
        <div
          className="card-glass"
          style={{
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: 16,
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label" htmlFor="login-email">
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 40 }}
                  autoComplete="email"
                />
                <Mail
                  size={16}
                  style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', color: 'var(--text-muted)',
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label" htmlFor="login-password">
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 40 }}
                  autoComplete="current-password"
                />
                <Lock
                  size={16}
                  style={{
                    position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', color: 'var(--text-muted)',
                  }}
                />
              </div>
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              type="submit"
              disabled={isLoading}
              id="login-submit-btn"
            >
              {isLoading
                ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Entrando...</>
                : <><LogIn size={18} /> Entrar</>
              }
            </button>
          </form>
        </div>

        {/* ─── Acesso Demo ─── */}
        <div
          className="card-glass"
          style={{ padding: '16px 20px', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <button
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'space-between', padding: '4px 0' }}
            onClick={() => setShowDemo((v) => !v)}
            id="demo-toggle-btn"
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              🎭 Acessar como Demo
            </span>
            <ChevronDown
              size={16}
              color="var(--text-muted)"
              style={{
                transition: 'transform 0.2s',
                transform: showDemo ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {showDemo && (
            <div
              className="anim-fade-in"
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                Escolha um perfil para testar o sistema:
              </p>
              {DEMO_USERS.slice(0, 6).map((u) => (
                <button
                  key={u.id}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', gap: 10, textAlign: 'left' }}
                  onClick={() => handleDemoLogin(u.id)}
                  id={`demo-user-${u.id}`}
                >
                  {/* Indicador de role */}
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: ROLE_COLORS[u.role],
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1 }}>{u.name}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {ROLE_LABELS[u.role]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 20 }}>
          © 2025 CRM Ramos Soares · Sistema Político
        </p>
      </div>
    </div>
  );
}
