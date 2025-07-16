import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    // Initial session fetch
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    setSession(null);
    setUser(null);
    setLoading(false);
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, error, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
} 