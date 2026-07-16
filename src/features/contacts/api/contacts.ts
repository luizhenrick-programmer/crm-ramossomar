// src/features/contacts/api/contacts.ts
// Camada de API — por ora usa dados mockados
// Substitua as implementações por chamadas Axios quando o backend estiver pronto

import type { IContact } from '../types';
import type { ContactSchema } from '../schemas/contactSchema';
import {
  MOCK_CONTACTS,
  getDescendants,
} from '../../../lib/mock-data';
import type { Role } from '../../auth/types';

// Estado local em memória (simula banco de dados)
let contactsStore: IContact[] = [...MOCK_CONTACTS];

// Simula latência de rede
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// =============================================
// GET — Retorna apenas os subordinados visíveis para o usuário
// =============================================
export async function getContacts(userId: string, role: Role): Promise<IContact[]> {
  await delay(400);

  if (role === 'admin') {
    return [...contactsStore];
  }

  // Retorna todos os descendentes diretos e indiretos
  return getDescendants(userId, contactsStore);
}

// =============================================
// GET por ID
// =============================================
export async function getContactById(id: string): Promise<IContact | null> {
  await delay(200);
  return contactsStore.find((c) => c.id === id) ?? null;
}

// =============================================
// CREATE
// =============================================
export async function createContact(
  data: ContactSchema,
  creatorId: string
): Promise<IContact> {
  await delay(600);

  const newContact: IContact = {
    id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: data.name,
    cpf: data.cpf,
    phone: data.phone,
    email: data.email || undefined,
    role: data.role,
    parent_id: creatorId, // sempre vinculado a quem criou
    zone: data.zone,
    address: data.address,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  contactsStore = [...contactsStore, newContact];
  return newContact;
}

// =============================================
// UPDATE
// =============================================
export async function updateContact(
  id: string,
  data: Partial<ContactSchema>
): Promise<IContact> {
  await delay(500);

  const idx = contactsStore.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error('Contato não encontrado');

  const updated: IContact = {
    ...contactsStore[idx],
    ...data,
    address: {
      ...contactsStore[idx].address,
      ...(data.address ?? {}),
    },
  };

  contactsStore = [
    ...contactsStore.slice(0, idx),
    updated,
    ...contactsStore.slice(idx + 1),
  ];

  return updated;
}

// =============================================
// DELETE (soft delete)
// =============================================
export async function deleteContact(id: string): Promise<void> {
  await delay(400);
  contactsStore = contactsStore.map((c) =>
    c.id === id ? { ...c, isActive: false } : c
  );
}
