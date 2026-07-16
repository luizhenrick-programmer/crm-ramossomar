// src/hooks/useHierarchy.ts
// Hook central da Regra de Ouro: filtra dados pelo contexto do usuário logado

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../features/contacts/api/contacts';
import type { ContactSchema } from '../features/contacts/schemas/contactSchema';
import toast from 'react-hot-toast';

export const CONTACTS_QUERY_KEY = 'contacts';

export function useContacts() {
  const { user } = useAuth();

  return useQuery({
    queryKey: [CONTACTS_QUERY_KEY, user?.id, user?.role],
    queryFn: () => {
      if (!user) return [];
      return getContacts(user.id, user.role);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 2, // 2 minutos de cache
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: ContactSchema) => {
      if (!user) throw new Error('Usuário não autenticado');
      return createContact(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      toast.success('Cadastro realizado com sucesso!', {
        duration: 4000,
        position: 'top-right',
      });
    },
    onError: (err: Error) => {
      toast.error(`Erro ao cadastrar: ${err.message}`, {
        position: 'top-right',
      });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactSchema> }) =>
      updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      toast.success('Cadastro atualizado!', { position: 'top-right' });
    },
    onError: (err: Error) => {
      toast.error(`Erro ao atualizar: ${err.message}`, { position: 'top-right' });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
      toast.success('Cadastro removido.', { position: 'top-right' });
    },
    onError: (err: Error) => {
      toast.error(`Erro ao remover: ${err.message}`, { position: 'top-right' });
    },
  });
}
