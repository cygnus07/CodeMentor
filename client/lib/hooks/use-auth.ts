// codementor/client/lib/hooks/use-auth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { authApi } from '@/lib/api/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authApi.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    authApi.logout();
    setUser(null);
    router.push('/login');
  };

  return { user, loading, logout };
}