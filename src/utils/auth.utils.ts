import { User } from 'firebase/auth';

export const isAdminUser = (user: User | null): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const setAdminSession = (isAdmin: boolean): void => {
  if (isAdmin) {
    localStorage.setItem('isAdmin', 'true');
  } else {
    localStorage.removeItem('isAdmin');
  }
};

export const clearAuthSession = (): void => {
  localStorage.removeItem('isAdmin');
};