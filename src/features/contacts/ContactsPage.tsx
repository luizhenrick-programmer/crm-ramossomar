// src/features/contacts/ContactsPage.tsx
import { TopBar } from '../../components/TopBar';
import { ContactsTable } from './components/ContactsTable';
import { useAuth } from '../auth/hooks/useAuth';
import { ROLES_CAN_CREATE } from '../auth/types';

export function ContactsPage() {
  const { user } = useAuth();
  const creatableRoles = user ? ROLES_CAN_CREATE[user.role] : [];

  return (
    <>
      <TopBar
        title="Cadastros"
        subtitle={
          creatableRoles.length > 0
            ? 'Gerencie os cadastros da sua rede política'
            : 'Visualização dos seus cadastros'
        }
      />
      <main className="main-content">
        <div className="page-container">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Rede de Contatos
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              Você vê apenas os cadastros da sua esfera de atuação
            </p>
          </div>
          <ContactsTable />
        </div>
      </main>
    </>
  );
}
