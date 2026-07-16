// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './features/auth/hooks/useAuth';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a2235',
                color: '#f1f5f9',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#064e3b' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#7f1d1d' },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
