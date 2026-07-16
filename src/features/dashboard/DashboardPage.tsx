// src/features/dashboard/DashboardPage.tsx
import { useAuth } from '../auth/hooks/useAuth';
import { ROLE_LABELS } from '../auth/types';
import { TopBar } from '../../components/TopBar';
import { StatCards } from './components/StatCards';
import { HierarchyChart } from './components/HierarchyChart';
import { useContacts } from '../../hooks/useHierarchy';
import { RoleBadge } from '../../components/Badge';
import type { Role } from '../auth/types';
import { TrendingUp, Clock, MapPin } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const { data: contacts = [] } = useContacts();

  // Últimos 5 cadastros
  const recentContacts = [...contacts]
    .filter((c) => c.isActive)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? 'Bom dia' : now.getHours() < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle={`${greeting}, ${user?.name?.split(' ')[0] ?? ''}! Aqui está um resumo da sua rede.`}
      />
      <main className="main-content">
        <div className="page-container">

          {/* Cabeçalho da página */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Visão Geral da Rede
              </h2>
              {user?.role && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <RoleBadge role={user.role} />
                  {user.zone && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} />
                      {user.zone}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-border)',
                borderRadius: 10,
                padding: '8px 16px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Clock size={14} />
              {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Stat Cards */}
          <section style={{ marginBottom: 28 }}>
            <StatCards />
          </section>

          {/* Gráfico + Recentes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
            {/* Gráfico de barras */}
            <HierarchyChart />

            {/* Cadastros recentes */}
            <div className="card" style={{ padding: 0 }}>
              <div
                style={{
                  padding: '20px 20px 16px',
                  borderBottom: '1px solid var(--surface-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <TrendingUp size={16} color="var(--brand-primary-light)" />
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Últimos Cadastros
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Adicionados recentemente
                  </p>
                </div>
              </div>

              {recentContacts.length === 0 ? (
                <div className="empty-state" style={{ padding: '32px 20px' }}>
                  <p style={{ fontSize: '0.82rem' }}>Nenhum cadastro ainda</p>
                </div>
              ) : (
                <div style={{ padding: '8px 0' }}>
                  {recentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 20px',
                        transition: 'background 0.12s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = 'var(--surface-card-hover)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
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
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div
                          className="truncate"
                          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}
                        >
                          {contact.name}
                        </div>
                        <div style={{ marginTop: 2 }}>
                          <RoleBadge role={contact.role} />
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                        {new Date(contact.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
