// src/components/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  LogOut,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { ROLE_LABELS } from '../features/auth/types';
import { RoleBadge } from './Badge';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/contacts', label: 'Cadastros', icon: Users },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar anim-slide-left">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Shield size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              CRM Ramos
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Gestão Política
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Menu</div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-item${isActive ? ' active' : ''}`
            }
          >
            <item.icon size={18} />
            <span style={{ flex: 1 }}>{item.label}</span>
            <ChevronRight size={14} style={{ opacity: 0.4 }} />
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="sidebar-footer">
        {user && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                background: 'rgba(26,86,232,0.06)',
                borderRadius: 10,
                border: '1px solid var(--surface-border)',
                marginBottom: 8,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div
                  className="truncate"
                  style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  {user.name}
                </div>
                <div style={{ marginTop: 2 }}>
                  <RoleBadge role={user.role} />
                </div>
              </div>
            </div>

            {user.zone && (
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  padding: '0 4px',
                  marginBottom: 8,
                }}
              >
                📍 {user.zone}
              </div>
            )}
          </div>
        )}

        <button
          className="sidebar-item"
          onClick={handleLogout}
          style={{ color: 'var(--danger)', width: '100%' }}
        >
          <LogOut size={17} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
