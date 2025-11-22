"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'react-router-dom';
import { useEffect } from 'react';

const supabase = createClientComponentClient();

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect se já logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/');
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="font-black text-2xl text-primary-foreground">F</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-2">Flixly</h1>
          <p className="text-muted-foreground">Faça login para gerenciar sua operação</p>
        </div>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'github']}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  primary: 'var(--primary)',
                  primary2: 'var(--primary)',
                  defaultButtonBackground: 'var(--secondary)',
                  defaultButtonText: 'var(--foreground)',
                  divider: 'var(--border)',
                },
                radii: {
                  button: 'var(--radius)',
                  input: 'var(--radius)',
                },
              },
            },
          }}
          theme="default"
          redirectTo="/"
        />
      </div>
    </div>
  );
}