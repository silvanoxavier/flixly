"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface RecentChat {
  id: string;
  customer_name: string;
  last_message: string;
  unread_count: number;
  updated_at: string;
}

interface RecentChatsProps {
  companyId: string | undefined;
}

export default function RecentChats({ companyId }: RecentChatsProps) {
  const { data: recentChats, isLoading } = useQuery<RecentChat[]>({
    queryKey: ['recent-chats', companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          customer_name,
          last_message,
          unread_count,
          updated_at
        `, { count: 'exact' })
        .eq('company_id', companyId)
        .order('updated_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
    enabled: !!companyId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Conversas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Última Mensagem</TableHead>
            <TableHead className="text-right">Não Lidas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentChats?.map((chat) => (
              <TableRow key={chat.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {chat.customer_name}
                </TableCell>
                <TableCell className="text-sm">{chat.last_message}</TableCell>
                <TableCell className="text-right">
                  {chat.unread_count > 0 && (
                    <Badge variant="destructive">{chat.unread_count}</Badge>
                  )}
                </TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  Nenhuma conversa recente
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}