"use client";

import { useState, useEffect, useRef } from 'react';
import { Bell, MessageCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { useOutletContext } from 'react-router-dom';

interface CompanyContext {
  company: { id: string; nome_fantasia: string } | null;
}

export default function ChatNotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { company } = useOutletContext<CompanyContext>();

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  useEffect(() => {
    if (!company?.id) return;

    const fetchUnread = async () => {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', company.id) // Simplified: unread per company
        .is('read_at', null);
      if (!error) {
        const count = count || 0;
        setUnreadCount(count);
        setHasUnread(count > 0);
      }
    };

    fetchUnread();

    // Realtime new messages
    const channel = supabase.channel('chat-messages');
    channel.on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${company.id}` 
      },
      (payload) => {
        if (!payload.new.read_at) {
          playNotificationSound();
          fetchUnread();
        }
      }
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, [company]);

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfH8N2QQAoUXrTp66hVFApGn+DyvmwhgKfqfuseEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet<dyad-write path="src/layouts/MainLayout.tsx" description="MainLayout: Remove Select → UserInfo + NotificationsMenu + ChatNotificationBell">
"use client";

import { useState, useEffect }<dyad-problem-report summary="4 problems">
<problem file="src/components/UserInfo.tsx" line="5" column="1" code="6133">'supabase' is declared but its value is never read.</problem>
<problem file="src/components/NotificationsMenu.tsx" line="54" column="22" code="18047">'session' is possibly 'null'.</problem>
<problem file="src/components/NotificationsMenu.tsx" line="78" column="14" code="2304">Cannot find name 'Button'.</problem>
<problem file="src/components/NotificationsMenu.tsx" line="80" column="15" code="2304">Cannot find name 'Button'.</problem>
</dyad-problem-report><think>[REDACTED]</think><dyad-write path="src/components/UserInfo.tsx" description="Fix TS6133: Remove unused supabase import">
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

interface UserInfoProps {
  company?: { nome_fantasia: string } | null;
}

export default function UserInfo({ company }: UserInfoProps) {
  const { session } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "UN";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  };

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={session?.user.user_metadata?.avatar_url} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
          {getInitials(session?.user.user_metadata?.full_name || session?.user.email)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 hidden md:block">
        <p className="text-sm font-medium truncate text-foreground">
          {session?.user.user_metadata?.full_name || session?.user.email?.split('@')[0] || 'Usuário'}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {company?.nome_fantasia || 'Empresa não selecionada'}
        </p>
      </div>
    </div>
  );
}