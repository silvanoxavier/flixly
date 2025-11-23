"use client";

import { useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/components/StatCard";
import RecentChats from "@/components/RecentChats";
import QuickActions from "@/components/QuickActions";

interface Company {
  id: string;
  nome_fantasia: string;
  name: string;
  instance: string;
}

interface DashboardStats {
  total_clients: number;
  today_messages: number;
  pending_orders: number;
  active_chats: number;
}

export default function Dashboard() {
  const context = useOutletContext<{ company: Company | null }>();
  const company = context?.company;
  const companyId = company?.id;

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats', companyId],
    queryFn: async () => {
      if (!companyId) return { total_clients: 0, today_messages: 0, pending_orders: 0, active_chats: 0 };
      
      const today = new Date().toISOString().split('T')[0];
      
      // Clients count
      const { count: clientsCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .is('deleted_at', null);

      // Messages today
      const { count: messagesCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .gte('created_at', `${today}T00:00:00Z`);

      // Pending orders (status 'novo' or 'preparo')
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .in('status', ['novo', 'preparo']);

      // Active chats (unread > 0)
      const { count: chatsCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .gt('unread_count', 0);

      return {
        total_clients: clientsCount || 0,
        today_messages: messagesCount || 0,
        pending_orders: ordersCount || 0,
        active_chats: chatsCount || 0,
      };
    },
    enabled: !!companyId,
  });

  if (!company || statsLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Dashboard - {company.nome_fantasia}
          </h1>
          <p className="text-muted-foreground">Visão geral da sua operação hoje.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clientes"
          value={stats.total_clients}
          change={12}
          trend="up"
        />
        <StatCard
          title="Mensagens Hoje"
          value={stats.today_messages}
          change={5}
          trend="up"
        />
        <StatCard
          title="Pedidos Pendentes"
          value={stats.pending_orders}
          change={-3}
          trend="down"
        />
        <StatCard
          title="Chats Ativos"
          value={stats.active_chats}
          change={8}
          trend="up"
        />
      </div>

      {/* Quick Actions & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentChats companyId={companyId} />
      </div>
    </div>
  );
}