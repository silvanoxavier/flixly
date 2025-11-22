"use client";

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Search, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import SidebarNav from "@/components/SidebarNav";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import UserInfo from "@/components/UserInfo";
import NotificationsMenu from "@/components/NotificationsMenu";
import ChatNotificationBell from "@/components/ChatNotificationBell";

interface Company {
  empresa_id: string;
  nome_fantasia: string;
  cnpj: string;
}

export default function MainLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login', { replace: true });
    }
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session?.user.id) return;

    const fetchCompanies = async () => {
      setCompaniesLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_client_companies', {
          client_user_id: session.user.id
        });
        if (error) throw error;
        if (data && data.length > 0) setSelectedCompany(data[0]);
      } catch (error) {
        console.error('Erro companies:', error);
      } finally {
        setCompaniesLoading(false);
      }
    };

    fetchCompanies();
  }, [session]);

  const handleMouseEnter = () => setSidebarExpanded(true);
  const handleMouseLeave = () => setTimeout(() => setSidebarExpanded(false), 150);
  const handleNavClick = () => setSidebarExpanded(false);

  const pageTitles: Record<string, string> = {
    "/": "Início",
    "/dashboard": "Dashboard",
    "/companies": "Empresas",
  };

  const currentTitle = pageTitles[location.pathname as keyof typeof pageTitles] || "Flixly";

  const baseSidebarClasses = "hidden md:block md:fixed md:left-0 md:top-20 md:h-[calc(100vh-5rem)] md:border-r md:bg-card/95 md:overflow-y-auto md:transition-all md:duration-400 md:ease-out";
  const expandedSidebarClasses = sidebarExpanded 
    ? "md:w-64 md:z-50 md:shadow-xl md:shadow-primary/10" 
    : "md:w-16 md:z-40 md:shadow-sm";
  
  const sidebarClasses = `${baseSidebarClasses} ${expandedSidebarClasses}`;
  const headerPaddingTop = 'pt-16 md:pt-20';

  if (loading || companiesLoading) {
    return <div className="flex items-center justify-center h-screen"><Skeleton className="h-12 w-48" /></div>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Header remains the same */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 border-b bg-card/90 backdrop-blur-sm z-50 flex items-center px-4 md:px-6">
        {/* ... header content unchanged ... */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 max-w-md">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-black text-lg md:text-xl text-primary-foreground tracking-tight">F</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Flixly</h1>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-foreground truncate hidden md:block ml-2">{currentTitle}</h2>
        </div>
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Pesquisar mensagens, clientes..." className="pl-10 w-full h-12 rounded-full" value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center space-x-4 min-w-0 flex-1 max-w-md justify-end">
          <UserInfo company={selectedCompany} />
          <NotificationsMenu />
          <ChatNotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Sun className="h-[1.2rem] w-[1.2rem]<dyad-execute-sql description="Preparar banco para cadastro: tabela plans + campos phone/plano_id + RLS">
-- Tabela plans (pública)
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public<dyad-problem-report summary="5 problems">
<problem file="src/pages/Login.tsx" line="92" column="17" code="2322">Type '{ children: string; href: string; className: string; }' is not assignable to type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'.
  Property 'href' does not exist on type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'. Did you mean 'ref'?</problem>
<problem file="src/pages/Signup.tsx" line="15" column="1" code="6133">'Label' is declared but its value is never read.</problem>
<problem file="src/pages/Signup.tsx" line="279" column="31" code="2322">Type '{ children: string; href: string; className: string; }' is not assignable to type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'.
  Property 'href' does not exist on type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'. Did you mean 'ref'?</problem>
<problem file="src/pages/Signup.tsx" line="283" column="31" code="2322">Type '{ children: string; href: string; className: string; }' is not assignable to type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'.
  Property 'href' does not exist on type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'. Did you mean 'ref'?</problem>
<problem file="src/pages/Signup.tsx" line="298" column="17" code="2322">Type '{ children: string; href: string; className: string; }' is not assignable to type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'.
  Property 'href' does not exist on type 'IntrinsicAttributes &amp; LinkProps &amp; RefAttributes&lt;HTMLAnchorElement&gt;'. Did you mean 'ref'?</problem>
</dyad-problem-report><think>[REDACTED]</think><dyad-write path="src/pages/Login.tsx" description="Fix TS2322: Change Link href to 'to'; react-router-dom v6 syntax">
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
          <Link to="/signup" className="text-sm text-center text-primary underline">
            Não tem conta? Crie agora
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}