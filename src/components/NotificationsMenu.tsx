"use client";

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export default function NotificationsMenu() {
  const { session } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.user.id) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, title, content, type, created_at, read_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error) {
        setNotifications(data || []);
        setUnreadCount(data?.filter(n => !n.read_at).length || 0);
      }
    };

    fetchNotifications();

    const channel = supabase.channel('notifications');
    channel.on('postgres_changes', 
      { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${session.user.id}` },
      () => fetchNotifications()
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const markAllRead = async () => {
    if (!session?.user.id) return;
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', session.user.id)
      .is('read_at', null);
    if (!error) {
      setUnreadCount(0);
      setNotifications(notifs => notifs.map(n => ({ ...n, read_at: new Date().toISOString() })));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative p-1.5 cursor-pointer hover:bg-accent rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full bg-destructive">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2" align="end">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCircle2 className="h-3 w-3 mr-1" /> Marcar lidas
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">Nenhuma notificação</p>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem key={notif.id} className="cursor-pointer p-3 border-b hover:bg-accent">
              <div>
                <p className="font-medium text-sm">{notif.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{notif.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(notif.created_at).toLocaleDateString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}