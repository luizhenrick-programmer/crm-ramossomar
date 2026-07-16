// src/components/Badge.tsx
import type { Role } from '../features/auth/types';
import { ROLE_LABELS } from '../features/auth/types';

interface BadgeProps {
  role: Role;
}

const ROLE_CLASS: Record<Role, string> = {
  admin: 'badge badge-admin',
  coord_geral: 'badge badge-coord-geral',
  coord_regional: 'badge badge-coord-regional',
  lideranca: 'badge badge-lideranca',
  cabo_eleitoral: 'badge badge-cabo',
};

const ROLE_DOT_COLOR: Record<Role, string> = {
  admin: '#a855f7',
  coord_geral: '#3b82f6',
  coord_regional: '#06b6d4',
  lideranca: '#10b981',
  cabo_eleitoral: '#f59e0b',
};

export function RoleBadge({ role }: BadgeProps) {
  return (
    <span className={ROLE_CLASS[role]}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: ROLE_DOT_COLOR[role],
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {ROLE_LABELS[role]}
    </span>
  );
}
