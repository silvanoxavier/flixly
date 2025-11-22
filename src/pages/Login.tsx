"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Importar useSearchParams
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
  const [searchParams] = useSearchParams(); // Hook para ler parâmetros da URL
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (session) {
      console.log('Sessão detectada, redirecionando para dashboard...', session.user.email);
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  // Novo useEffect para lidar com a confirmação de e-mail
  useEffect(() => {
    const type = searchParams.get('type');
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (type === 'signup' && accessToken && refreshToken) {
      console.log('Parâmetros de confirmação de e-mail detectados. Tentando finalizar sessão...');
      // Supabase automaticamente lida com a sessão quando os tokens estão na URL
      // Mas podemos forçar a atualização da sessão para garantir
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          console.error('Erro ao definir sessão após confirmação:', error.message);
          showError('Erro ao confirmar e-mail. Tente fazer login.');
        } else {
          showSuccess('E-mail confirmado com sucesso! Redirecionando para o dashboard.');
          navigate('/dashboard', { replace: true });
        }
      });
    }
  }, [searchParams, navigate]);


  const onSubmit = async (data: FormData) => {
    console.log('Form submit chamado com:', data.email);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    console.log('Supabase response:', { error });

    if (error) {
      console.error('Erro de login:', error.message, error.status);
      let errorMessage = 'Erro no login. Verifique suas credenciais.';
      
      if (error.status === 400) errorMessage = 'E-mail ou senha inválidos.';
      else if (error.status === 429) errorMessage = 'Muitas tentativas. Tente novamente em 1 minuto.';
      else if (error.message.includes('Email not confirmed')) errorMessage = 'Confirme seu e-mail antes de logar.';
      
      showError(errorMessage);
      return;
    }

    showSuccess('Login realizado com sucesso! Redirecionando...');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4">
            <span className="font-black text-xl text-primary-foreground">F</span>
          </div>
          <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">
            Faça login na sua conta Flixly
          </CardDescription>
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
            Não tem conta? Crie agora
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}