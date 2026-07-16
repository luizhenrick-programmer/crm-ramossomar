// src/features/auth/hooks/useAuth.ts
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { IUser } from '../types';
import { DEMO_USERS } from '../../../lib/mock-data';

interface AuthContextValue {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsDemo: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'crm_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, _password: string) => {
    // Simulação: busca usuário pelo e-mail nos dados mockados
    // Substitua por chamada real: await api.post('/auth/login', { email, password })
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found) {
      throw new Error('E-mail ou senha incorretos.');
    }
    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }, []);

  const loginAsDemo = useCallback((userId: string) => {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, loginAsDemo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
