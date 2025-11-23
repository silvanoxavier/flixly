"use client";

import { useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/components/StatCard";
import RecentChats from "@/components/RecentChats";
import QuickActions from "@/components/QuickActions";

interface Company {
  id: string;
  nome_fantasia: string;
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

  const { data: stats = { total_clients: 0, today_messages: 0, pending_orders: 0, active_chats: 0 }, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats', companyId],
    queryFn: async () => {
      if (!companyId) return { total_clients: 0, today_messages: 0, pending_orders: 0, active_chats: 0 };
      const today = new Date().toISOString().split('T')[0];
      const [clientsRes, messagesRes, ordersRes, chatsRes] = await Promise.all([
        supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('company_id', companyId).is('deleted_at', null),
        supabase.from('messages').select('*', { count: 'exact', head: true }).eq('company_id', companyId).gte('created_at', `${today}T00:00:00Z`),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('company_id', companyId).in('status', ['novo', 'preparo']),
        supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('company_id', companyId).gt('unread_count', 0)
      ]);
      return {
        total_clients: clientsRes.count || 0,
        today_messages: messagesRes.count || 0,
        pending_orders: ordersRes.count || 0,
        active_chats: chatsRes.count || 0,
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
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Clientes" value={stats.total_clients} change={12} trend="up" />
        <StatCard title="Mensagens Hoje" value={stats.today_messages} change={5} trend="up" />
        <StatCard title="Pedidos Pendentes" value={stats.pending_orders} change={-3} trend="down" />
        <StatCard title="Chats Ativos" value={stats.active_chats} change={8} trend="up" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentChats companyId={companyId} />
      </div>
    </div>
  );
}