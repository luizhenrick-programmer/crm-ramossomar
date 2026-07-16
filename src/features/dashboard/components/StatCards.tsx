// src/features/dashboard/components/StatCards.tsx
import { useContacts } from '../../../hooks/useHierarchy';
import type { Role } from '../../auth/types';
import { Users, Shield, Star, Zap, Award } from 'lucide-react';

const ROLE_CONFIG: Array<{
  role: Role;
  label: string;
  icon: React.ElementType;
  accentColor: string;
}> = [
  { role: 'coord_geral', label: 'Coord. Gerais', icon: Shield, accentColor: 'var(--role-coord-geral)' },
  { role: 'coord_regional', label: 'Coord. Regionais', icon: Award, accentColor: 'var(--role-coord-regional)' },
  { role: 'lideranca', label: 'Lideranças', icon: Star, accentColor: 'var(--role-lideranca)' },
  { role: 'cabo_eleitoral', label: 'Cabos Eleitorais', icon: Zap, accentColor: 'var(--role-cabo)' },
];

export function StatCards() {
  const { data: contacts = [], isLoading } = useContacts();

  const activeContacts = contacts.filter((c) => c.isActive);
  const total = activeContacts.length;

  if (isLoading) {
    return (
      <div className="grid-stats">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 100, borderRadius: 12 }} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid-stats">
      {/* Total */}
      <div
        className="stat-card"
        style={{ '--card-accent': 'linear-gradient(90deg, var(--brand-primary), var(--brand-accent))' } as React.CSSProperties}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'rgba(26,86,232,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Users size={20} color="var(--brand-primary-light)" />
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total Geral</div>
      </div>

      {/* Por role */}
      {ROLE_CONFIG.map(({ role, label, icon: Icon, accentColor }) => {
        const count = activeContacts.filter((c) => c.role === role).length;
        return (
          <div
            key={role}
            className="stat-card"
            style={{ '--card-accent': accentColor } as React.CSSProperties}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: `${accentColor}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={20} color={accentColor} />
            </div>
            <div className="stat-value">{count}</div>
            <div className="stat-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
