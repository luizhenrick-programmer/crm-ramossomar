// src/lib/mock-data.ts
// Dados mockados para V1 — substitua pelas chamadas Axios reais quando o backend estiver pronto

import type { IContact } from '../features/contacts/types';
import type { IUser } from '../features/auth/types';

// =============================================
// USUÁRIOS DEMO (para login simulado)
// =============================================
export const DEMO_USERS: IUser[] = [
  {
    id: 'user-admin-1',
    name: 'Dr. Ramos Soares',
    email: 'admin@crmramos.com',
    role: 'admin',
    parent_id: null,
    zone: 'Toda a cidade',
  },
  {
    id: 'user-cg-1',
    name: 'Marcos Ferreira',
    email: 'marcos@crmramos.com',
    role: 'coord_geral',
    parent_id: 'user-admin-1',
    zone: 'Zona Norte',
  },
  {
    id: 'user-cg-2',
    name: 'Beatriz Santos',
    email: 'beatriz@crmramos.com',
    role: 'coord_geral',
    parent_id: 'user-admin-1',
    zone: 'Zona Sul',
  },
  {
    id: 'user-cr-1',
    name: 'Carlos Almeida',
    email: 'carlos@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-1',
    zone: 'Vila Nova',
  },
  {
    id: 'user-cr-2',
    name: 'Fernanda Lima',
    email: 'fernanda@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-1',
    zone: 'Jardim das Flores',
  },
  {
    id: 'user-cr-3',
    name: 'Paulo Rodrigues',
    email: 'paulo@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-2',
    zone: 'Centro Histórico',
  },
  {
    id: 'user-lid-1',
    name: 'Ana Cristina Souza',
    email: 'ana@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-1',
    zone: 'Rua das Acácias',
  },
  {
    id: 'user-lid-2',
    name: 'Roberto Nascimento',
    email: 'roberto@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-1',
    zone: 'Av. Principal',
  },
  {
    id: 'user-lid-3',
    name: 'Juliana Moreira',
    email: 'juliana@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-2',
    zone: 'Bairro Novo',
  },
  {
    id: 'user-cabo-1',
    name: 'Diego Pereira',
    email: 'diego@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-1',
    zone: 'Rua das Acácias - Setor A',
  },
  {
    id: 'user-cabo-2',
    name: 'Sabrina Oliveira',
    email: 'sabrina@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-1',
    zone: 'Rua das Acácias - Setor B',
  },
];

// =============================================
// CONTATOS MOCKADOS
// =============================================
export const MOCK_CONTACTS: IContact[] = [
  // Coordenadores Gerais
  {
    id: 'user-cg-1',
    name: 'Marcos Ferreira',
    cpf: '12345678901',
    phone: '11987654321',
    email: 'marcos@crmramos.com',
    role: 'coord_geral',
    parent_id: 'user-admin-1',
    zone: 'Zona Norte',
    address: { cep: '01001000', logradouro: 'Praça da Sé', numero: '1', bairro: 'Sé', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-10T10:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cg-2',
    name: 'Beatriz Santos',
    cpf: '23456789012',
    phone: '11976543210',
    email: 'beatriz@crmramos.com',
    role: 'coord_geral',
    parent_id: 'user-admin-1',
    zone: 'Zona Sul',
    address: { cep: '04101000', logradouro: 'Av. Brigadeiro Luís Antônio', numero: '500', bairro: 'Bela Vista', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-12T11:00:00Z',
    isActive: true,
  },
  // Coordenadores Regionais
  {
    id: 'user-cr-1',
    name: 'Carlos Almeida',
    cpf: '34567890123',
    phone: '11965432109',
    email: 'carlos@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-1',
    zone: 'Vila Nova',
    address: { cep: '02001000', logradouro: 'Rua Voluntários da Pátria', numero: '200', bairro: 'Santana', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-15T09:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cr-2',
    name: 'Fernanda Lima',
    cpf: '45678901234',
    phone: '11954321098',
    email: 'fernanda@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-1',
    zone: 'Jardim das Flores',
    address: { cep: '02100000', logradouro: 'Av. Tucuruvi', numero: '350', bairro: 'Tucuruvi', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-18T14:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cr-3',
    name: 'Paulo Rodrigues',
    cpf: '56789012345',
    phone: '11943210987',
    email: 'paulo@crmramos.com',
    role: 'coord_regional',
    parent_id: 'user-cg-2',
    zone: 'Centro Histórico',
    address: { cep: '01002000', logradouro: 'Viaduto do Chá', numero: '100', bairro: 'República', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-20T10:30:00Z',
    isActive: true,
  },
  // Lideranças
  {
    id: 'user-lid-1',
    name: 'Ana Cristina Souza',
    cpf: '67890123456',
    phone: '11932109876',
    email: 'ana@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-1',
    zone: 'Rua das Acácias',
    address: { cep: '02200000', logradouro: 'Rua das Acácias', numero: '45', bairro: 'Casa Verde', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-22T09:00:00Z',
    isActive: true,
  },
  {
    id: 'user-lid-2',
    name: 'Roberto Nascimento',
    cpf: '78901234567',
    phone: '11921098765',
    email: 'roberto@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-1',
    zone: 'Av. Principal',
    address: { cep: '02300000', logradouro: 'Av. Engenheiro Caetano Álvares', numero: '800', bairro: 'Limão', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-24T11:00:00Z',
    isActive: true,
  },
  {
    id: 'user-lid-3',
    name: 'Juliana Moreira',
    cpf: '89012345678',
    phone: '11910987654',
    email: 'juliana@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-2',
    zone: 'Bairro Novo',
    address: { cep: '02150000', logradouro: 'Rua Baronesa de Itu', numero: '20', bairro: 'Tucuruvi', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-26T13:00:00Z',
    isActive: true,
  },
  {
    id: 'user-lid-4',
    name: 'Sandro Melo',
    cpf: '90123456789',
    phone: '11909876543',
    email: 'sandro@crmramos.com',
    role: 'lideranca',
    parent_id: 'user-cr-3',
    zone: 'Praça da República',
    address: { cep: '01045000', logradouro: 'Praça da República', numero: '120', bairro: 'República', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-01-28T10:00:00Z',
    isActive: true,
  },
  // Cabos Eleitorais
  {
    id: 'user-cabo-1',
    name: 'Diego Pereira',
    cpf: '01234567890',
    phone: '11998765432',
    email: 'diego@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-1',
    zone: 'Setor A',
    address: { cep: '02201000', logradouro: 'Rua das Acácias', numero: '10', bairro: 'Casa Verde', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-02-01T09:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cabo-2',
    name: 'Sabrina Oliveira',
    cpf: '11223344556',
    phone: '11987654320',
    email: 'sabrina@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-1',
    zone: 'Setor B',
    address: { cep: '02202000', logradouro: 'Rua das Acácias', numero: '88', bairro: 'Casa Verde', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-02-02T10:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cabo-3',
    name: 'Thiago Barbosa',
    cpf: '22334455667',
    phone: '11976543219',
    email: 'thiago@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-2',
    zone: 'Setor C',
    address: { cep: '02301000', logradouro: 'Av. Engenheiro Caetano Álvares', numero: '500', bairro: 'Limão', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-02-03T11:00:00Z',
    isActive: true,
  },
  {
    id: 'user-cabo-4',
    name: 'Patrícia Gomes',
    cpf: '33445566778',
    phone: '11965432108',
    email: 'patricia@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-3',
    zone: 'Setor D',
    address: { cep: '02151000', logradouro: 'Rua Baronesa de Itu', numero: '55', bairro: 'Tucuruvi', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-02-04T09:30:00Z',
    isActive: true,
  },
  {
    id: 'user-cabo-5',
    name: 'Leonardo Carvalho',
    cpf: '44556677889',
    phone: '11954321097',
    email: 'leo@crmramos.com',
    role: 'cabo_eleitoral',
    parent_id: 'user-lid-4',
    zone: 'Centro - Lote 1',
    address: { cep: '01046000', logradouro: 'Praça da República', numero: '200', bairro: 'República', cidade: 'São Paulo', uf: 'SP' },
    createdAt: '2024-02-05T14:00:00Z',
    isActive: true,
  },
];

// =============================================
// FUNÇÕES HELPER
// =============================================

// Busca recursiva: retorna todos os descendentes de um usuário
export function getDescendants(userId: string, allContacts: IContact[]): IContact[] {
  const directChildren = allContacts.filter((c) => c.parent_id === userId);
  const descendants: IContact[] = [...directChildren];
  for (const child of directChildren) {
    descendants.push(...getDescendants(child.id, allContacts));
  }
  return descendants;
}

// Retorna apenas os subordinados diretos
export function getDirectSubordinates(userId: string, allContacts: IContact[]): IContact[] {
  return allContacts.filter((c) => c.parent_id === userId);
}
