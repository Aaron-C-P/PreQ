import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export interface AuthFormState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

interface UseAuthFormProps {
  isSignup: boolean;
  redirectTo: string;
}

export const useAuthForm = ({ isSignup, redirectTo }: UseAuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignup) {
        await authService.register(email, password);
        navigate(redirectTo, { replace: true });
      } else {
        const { isAdmin } = await authService.loginWithCredentials(email, password);
        if (isAdmin) {
          navigate('/admin', { replace: true });
        } else {
          navigate(redirectTo, { replace: true });
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formState: {
      email,
      setEmail,
      password,
      setPassword,
    },
    handleSubmit,
    loading,
    error,
  };
};