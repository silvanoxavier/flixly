"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { showError, showSuccess } from '@/utils/toast';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (session) navigate('/');
  }, [session, navigate]);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      showError(error.message);
    } else {
      showSuccess('Login realizado!');
      navigate('/');
    }
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
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/signup" className="text-sm text-center text-primary underline">
            Não tem conta? Crie agora
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}