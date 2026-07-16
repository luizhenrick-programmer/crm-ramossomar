// src/components/TopBar.tsx
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { ROLE_LABELS } from '../features/auth/types';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div>
        <h1
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Notificações (placeholder) */}
        <button
          className="btn btn-ghost btn-sm"
          style={{ position: 'relative', padding: 8 }}
          aria-label="Notificações"
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              background: 'var(--brand-accent)',
              borderRadius: '50%',
              border: '2px solid var(--surface-bg)',
            }}
          />
        </button>

        {/* Perfil do usuário */}
        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              background: 'var(--surface-card)',
              borderRadius: 99,
              border: '1px solid var(--surface-border)',
              fontSize: '0.82rem',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#fff',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {user.name.split(' ')[0]}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              · {ROLE_LABELS[user.role]}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
