"use client";

import { useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, FileBarChart, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Company {
  id: string;
  name: string;
  instance: string;
}

interface Stats {
  title: string;
  value: number;
  change: string;
  icon: React.ElementType;
  loading: boolean;
}

export default function Dashboard() {
  // Acessa o contexto de forma segura
  const context = useOutletContext<{ company: Company | null }>();
  const company = context?.company; // Acesso seguro com optional chaining
  const companyId = company?.id;

  const clientesQuery = useQuery({
    queryKey: ['clientes-count', companyId],
    queryFn: async () => {
      if (!companyId) return 0;
      const { count, error } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!companyId, // Habilita a query apenas se companyId existir
  });

  const conversasQuery = useQuery({
    queryKey: ['conversas-count', companyId],
    queryFn: async () => {
      if (!companyId) return 0;
      const { count, error } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!companyId,
  });

  const pedidosQuery = useQuery({
    queryKey: ['pedidos-count', companyId],
    queryFn: async () => {
      if (!companyId) return 0;
      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!companyId,
  });

  const produtosQuery = useQuery({
    queryKey: ['produtos-count', companyId],
    queryFn: async () => {
      if (!companyId) return 0;
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!companyId,
  });

  const stats: Omit<Stats, 'loading'>[] = [
    { title: "Clientes", value: clientesQuery.data || 0, change: "+12%", icon: Users },
    { title: "Conversas", value: conversasQuery.data || 0, change: "+5%", icon: MessageCircle },
    { title: "Pedidos", value: pedidosQuery.data || 0, change: "+20%", icon: FileBarChart },
    { title: "Produtos", value: produtosQuery.data || 0, change: "+8%", icon: Package },
  ];

  const isLoading = clientesQuery.isLoading || conversasQuery.isLoading || pedidosQuery.isLoading || produtosQuery.isLoading;

  // Renderiza um skeleton se a empresa não estiver carregada ou se os dados estiverem carregando
  if (!company || isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua operação Flixly ({company?.nome_fantasia}).</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const query = [clientesQuery, conversasQuery, pedidosQuery, produtosQuery][i];
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl lg:text-4xl font-bold">
                  {query.isError ? (
                    <Badge variant="destructive" className="text-xs">Erro</Badge>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}