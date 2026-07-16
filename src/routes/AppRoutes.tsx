// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '../features/auth/components/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ContactsPage } from '../features/contacts/ContactsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas privadas (com Sidebar) */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
