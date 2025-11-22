"use client";

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, usePathname } from 'react-router-dom';
import { Database } from '@/types/supabase'; // Gerado pelo Supabase

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      // Authenticated → main app
      if (pathname === '/auth') router.replace('/');
    } else {
      // Unauthenticated → auth page
      if (pathname !== '/auth' && pathname !== '/') router.replace('/auth');
    }
  }, [session, pathname, router]);

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};