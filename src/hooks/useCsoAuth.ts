import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { csoAuthService } from '../services/cso.auth.service';
import { authService } from '../services/auth.service';

export const useCsoAuth = () => {
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
      // Login with Firebase
      const { user } = await authService.loginWithCredentials(email, password);
      
      if (!user) {
        setError('Authentication failed');
        setLoading(false);
        return;
      }

      // Verify CSO status
      const isCso = await csoAuthService.verifyCsoAccess(user.uid);
      
      if (!isCso) {
        setError('Access denied. Not a CSO account.');
        await authService.logout();
        setLoading(false);
        return;
      }

      // Set CSO session
      localStorage.setItem('isCso', 'true');
      
      // Navigate to CSO dashboard
      navigate('/cso');
    } catch (err: any) {
      console.error('CSO login error:', err);
      setError('Failed to login as CSO. Please try again.');
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