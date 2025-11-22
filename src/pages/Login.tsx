"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [searchParams] = useSearchParams();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  // Confirmação de e-mail via URL params
  useEffect(() => {
    const type = searchParams.get('type');
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (type === 'signup' && accessToken && refreshToken) {
      // Tenta definir a sessão com os tokens da URL
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          console.error("Erro ao definir sessão após confirmação de e-mail:", error);
          showError('Erro ao confirmar e-mail. Tente login manual.');
        } else {
          showSuccess('E-mail confirmado! Redirecionando...');
          // Limpa os parâmetros da URL para evitar reprocessamento
          navigate('/dashboard', { replace: true });
        }
      });
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      let msg = 'Erro no login.';
      if (error.status === 400) msg = 'E-mail/senha inválidos.';
      else if (error.message.includes('Email not confirmed')) msg = 'Confirme seu e-mail primeiro.';
      showError(msg);
      return;
    }

    showSuccess('Login OK!');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4">
            <span className="font-black text-xl text-primary-foreground">F</span>
          </div>
          <CardTitle className="text-2xl text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-center">Faça login na Flixly</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/signup" className="text-sm text-center text-primary underline">
            Criar conta
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}