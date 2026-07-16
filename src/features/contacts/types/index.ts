// src/features/contacts/types/index.ts

import type { Role } from '../../auth/types';

export interface IAddress {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface IContact {
  id: string;
  name: string;
  cpf: string;        // armazenado apenas dígitos
  phone: string;      // armazenado apenas dígitos
  email?: string;
  role: Role;
  parent_id: string | null;
  address: IAddress;
  zone?: string;      // Zona eleitoral
  createdAt: string;
  isActive: boolean;
}

export type ContactFormData = Omit<IContact, 'id' | 'createdAt' | 'isActive'>;

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
