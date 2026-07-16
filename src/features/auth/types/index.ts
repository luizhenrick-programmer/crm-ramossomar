// src/features/auth/types/index.ts

export type Role =
  | 'admin'
  | 'coord_geral'
  | 'coord_regional'
  | 'lideranca'
  | 'cabo_eleitoral';

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrador',
  coord_geral: 'Coordenador Geral',
  coord_regional: 'Coordenador Regional',
  lideranca: 'Liderança',
  cabo_eleitoral: 'Cabo Eleitoral',
};

export const ROLE_HIERARCHY: Record<Role, number> = {
  admin: 5,
  coord_geral: 4,
  coord_regional: 3,
  lideranca: 2,
  cabo_eleitoral: 1,
};

// Todos os roles que um usuário pode CADASTRAR (todos os níveis abaixo)
export const ROLES_CAN_CREATE: Record<Role, Role[]> = {
  admin:           ['coord_geral', 'coord_regional', 'lideranca', 'cabo_eleitoral'],
  coord_geral:     ['coord_regional', 'lideranca', 'cabo_eleitoral'],
  coord_regional:  ['lideranca', 'cabo_eleitoral'],
  lideranca:       ['cabo_eleitoral'],
  cabo_eleitoral:  [],
};

/** Retorna true se o usuário pode criar cadastros */
export function canCreateAny(role: Role): boolean {
  return ROLES_CAN_CREATE[role].length > 0;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  parent_id: string | null;
  zone?: string;
}
