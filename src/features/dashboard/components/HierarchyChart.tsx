// src/features/dashboard/components/HierarchyChart.tsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useContacts } from '../../../hooks/useHierarchy';
import { ROLE_LABELS, type Role } from '../../auth/types';

const ROLE_COLORS: Record<Role, string> = {
  admin: '#a855f7',
  coord_geral: '#3b82f6',
  coord_regional: '#06b6d4',
  lideranca: '#10b981',
  cabo_eleitoral: '#f59e0b',
};

const ROLES_ORDER: Role[] = ['coord_geral', 'coord_regional', 'lideranca', 'cabo_eleitoral'];

// Tooltip customizado
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--surface-border-light)',
        borderRadius: 10,
        padding: '10px 16px',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ color: payload[0].color, fontWeight: 800, fontSize: '1.3rem' }}>
        {payload[0].value}
        <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 4 }}>
          cadastro{payload[0].value !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

export function HierarchyChart() {
  const { data: contacts = [], isLoading } = useContacts();

  const chartData = ROLES_ORDER.map((role) => ({
    name: ROLE_LABELS[role].replace('Coordenador ', 'Coord. '),
    count: contacts.filter((c) => c.isActive && c.role === role).length,
    role,
  }));

  if (isLoading) {
    return <div className="skeleton" style={{ height: 280, borderRadius: 12 }} />;
  }

  return (
    <div className="card">
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          Distribuição por Nível
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
          Total de cadastros ativos por posição na hierarquia
        </p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} barSize={36} style={{ fontFamily: 'Inter, sans-serif' }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--surface-border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.role} fill={ROLE_COLORS[entry.role]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
