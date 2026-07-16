// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Sidebar } from '../components/Sidebar';

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
