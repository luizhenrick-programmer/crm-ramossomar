// src/features/contacts/schemas/contactSchema.ts
import { z } from 'zod';
import { validateCPF, cleanDigits } from '../../../utils/masks';

export const addressSchema = z.object({
  cep: z.string().min(8, 'CEP obrigatório').transform(cleanDigits),
  logradouro: z.string().min(3, 'Logradouro obrigatório'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  uf: z.string().length(2, 'UF inválida'),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter ao menos 3 caracteres')
    .max(100, 'Nome muito longo'),

  cpf: z
    .string()
    .transform(cleanDigits)
    .refine((val) => val.length === 11, 'CPF deve ter 11 dígitos')
    .refine((val) => validateCPF(val), 'CPF inválido'),

  phone: z
    .string()
    .transform(cleanDigits)
    .refine((val) => val.length >= 10 && val.length <= 11, 'Telefone inválido'),

  email: z
    .string()
    .email('E-mail inválido')
    .optional()
    .or(z.literal('')),

  role: z.enum(
    ['admin', 'coord_geral', 'coord_regional', 'lideranca', 'cabo_eleitoral'],
    { errorMap: () => ({ message: 'Selecione o nível hierárquico' }) }
  ),

  parent_id: z.string().nullable(),

  zone: z.string().optional(),

  address: addressSchema,
});

export type ContactSchema = z.infer<typeof contactSchema>;
