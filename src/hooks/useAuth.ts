import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { authService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  role: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    role: 'user'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        const role = authService.getUserRole();
        setAuthState((prev) => ({
          ...prev,
          user,
          loading: false,
          role
        }));
      },
      (error) => {
        setAuthState((prev) => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        error: 'Error signing out'
      }));
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    role: authState.role,
    isAdmin: authState.role === 'admin',
    isCso: authState.role === 'cso',
    signOut,
  };
};