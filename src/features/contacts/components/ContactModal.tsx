// src/features/contacts/components/ContactModal.tsx
import { Modal } from '../../../components/Modal';
import { ContactForm } from './ContactForm';
import { useCreateContact, useUpdateContact } from '../../../hooks/useHierarchy';
import type { ContactSchema } from '../schemas/contactSchema';
import type { IContact } from '../types';
import { UserPlus, Save, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  editContact?: IContact | null;
}

export function ContactModal({ isOpen, onClose, editContact }: ContactModalProps) {
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();

  const isEdit = !!editContact;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: ContactSchema) => {
    try {
      if (isEdit && editContact) {
        await updateMutation.mutateAsync({ id: editContact.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch {
      // Erros são tratados pelos onError das mutations (toast)
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Editar Cadastro' : 'Novo Cadastro'}
      subtitle={
        isEdit
          ? `Editando: ${editContact?.name}`
          : 'Preencha os dados do novo cadastro na rede'
      }
      size="lg"
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            form="contact-form"
            type="submit"
            disabled={isLoading}
            id="contact-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Salvando...
              </>
            ) : isEdit ? (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Cadastrar
              </>
            )}
          </button>
        </>
      }
    >
      <ContactForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        defaultValues={editContact ?? undefined}
      />
    </Modal>
  );
}
