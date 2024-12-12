import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '../services/admin.auth.service';
import { authService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../config/constants';

export const useAdminAuth = () => {
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
      // First verify if these are admin credentials
      const isValidAdmin = email === AUTH_CONSTANTS.ADMIN.EMAIL && 
                         password === AUTH_CONSTANTS.ADMIN.PASSWORD;
      
      if (!isValidAdmin) {
        setError('Invalid admin credentials');
        setLoading(false);
        return;
      }

      // Login with Firebase
      const { user } = await authService.loginWithCredentials(email, password);
      
      if (!user) {
        setError('Authentication failed');
        setLoading(false);
        return;
      }

      // Create admin document and initial stats
      await adminAuthService.createAdminDocument(user.uid);
      
      // Set admin session
      localStorage.setItem('isAdmin', 'true');
      
      // Navigate to admin dashboard
      navigate(AUTH_CONSTANTS.ROUTES.ADMIN_DASHBOARD);
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError('Failed to login as admin. Please try again.');
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