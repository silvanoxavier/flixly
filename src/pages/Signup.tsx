"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showError, showSuccess } from '@/utils/toast';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { formatCnpj, isValidCnpj } from '@/utils/cnpj';
import { formatPhoneNumber } from '@/utils/phone'; // Importar função de formatação de telefone

const formSchema = z.object({
  nome_empresa: z.string().min(3, 'Nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string()
    .refine(value => {
      const cleanedCnpj = value.replace(/[^\d]+/g, '');
      return isValidCnpj(cleanedCnpj);
    }, 'CNPJ inválido'),
  nome_responsavel: z.string().min(2, 'Nome responsável inválido'),
  whatsapp: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'WhatsApp inválido (ex: (11) 99999-9999)').transform(val => val.replace(/\D/g, '')), // Transforma para salvar limpo
  email: z.string().email('E-mail inválido'),
  plano_id: z.string({ required_error: 'Selecione um plano' }),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirm_password: z.string().min(6, 'Confirme a senha'),
  aceita_termos: z.boolean().refine(v => v === true, 'Aceite os termos para continuar'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'As senhas não coincidem',
  path: ['confirm_password'],
});

type FormData = z.infer<typeof formSchema>;

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_empresa: '',
      cnpj: '',
      nome_responsavel: '',
      whatsapp: '',
      email: '',
      plano_id: '',
      password: '',
      confirm_password: '',
      aceita_termos: false,
    },
  });

  const { data: plans } = useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase.from('plans').select('*').eq('active', true).order('price');
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    if (session) navigate('/');
  }, [session, navigate]);

  const onSubmit = async (values: FormData) => {
    try {
      // 1. Signup Supabase Auth (passando first_name e phone no metadata)
      const { data, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.nome_responsavel,
            phone: values.whatsapp, // Passando o número de telefone limpo
          },
        },
      });

      if (authError) throw authError;

      if (!data.user) throw new Error('Falha no cadastro');

      // 2. Criar empresa
      const { data: empresaData, error: empError } = await supabase
        .from('empresas')
        .insert({
          nome_fantasia: values.nome_empresa,
          cnpj: values.cnpj.replace(/[^\d]+/g, ''), // CNPJ limpo
          razao_social: values.nome_empresa,
          plano_id: values.plano_id,
        })
        .select('id')
        .single();

      if (empError) throw empError;

      // 3. Associar user à empresa (clientes_empresas)
      const { error: linkError } = await supabase
        .from('clientes_empresas')
        .insert({
          user_id: data.user.id,
          empresa_id: empresaData.id,
        });

      if (linkError) throw linkError;

      showSuccess('Conta criada com sucesso! Verifique seu e-mail para confirmar e faça login.');
      form.reset(); // Resetar o formulário
      navigate('/login');
    } catch (error: any) {
      showError(error.message || 'Erro no cadastro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4">
            <span className="font-black text-xl text-primary-foreground">F</span>
          </div>
          <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">Crie sua conta Flixly</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome_empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Minha Empresa Ltda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12.345.678/0001-90"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCnpj(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={18}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome_responsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 99999-9999"
                          {...field}
                          value={formatPhoneNumber(field.value)} // Aplica a máscara para exibição
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted); // Salva o valor mascarado no estado do formulário
                          }}
                          maxLength={15} // (XX) XXXXX-XXXX
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plano_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {plans?.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name} - R$ {plan.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirme senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="aceita_termos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        Aceito os{' '}
                        <Link to="/terms" className="underline text-primary">Termos</Link>{' '}
                        e{' '}
                        <Link to="/privacy" className="underline text-primary">Privacidade</Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                Criar Conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/login" className="text-sm text-center text-primary underline">
            Já tem conta? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}