import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError('Email inválido');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError('Email inválido');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setError('Senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    setLoading(false);
  };

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError('Email inválido');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword
  };
};
