"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { useOutletContext } from 'react-router-dom';

interface CompanyContext {
  company: { id: string; nome_fantasia: string } | null;
}

export default function ChatNotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const context = useOutletContext<CompanyContext | null>();
  const company = context?.company;

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const fetchUnreadCount = async (conversationIds: string[]) => {
    if (conversationIds.length === 0 || !company?.id) {
      setUnreadCount(0);
      return;
    }
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .is('read_at', null)
      .neq('sender_type', 'bot')
      .eq('company_id', company.id);

    if (!error) {
      setUnreadCount(count || 0);
    }
  };

  useEffect(() => {
    if (!company?.id) {
      setUnreadCount(0);
      return;
    }

    let conversationIds: string[] = [];

    const setupSubscription = async () => {
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .eq('company_id', company.id);

      if (convError || !conversations) {
        console.error("Error fetching conversations:", convError);
        return;
      }
      
      conversationIds = conversations.map(c => c.id);
      await fetchUnreadCount(conversationIds);

      const channel = supabase
        .channel(`chat-messages-${company.id}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `company_id=eq.${company.id}`
          },
          (payload) => {
            if (payload.new && !payload.new.read_at && payload.new.sender_type !== 'bot') {
              playNotificationSound();
              fetchUnreadCount(conversationIds);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupSubscription();

    return () => {
      if (cleanup) cleanup();
    };
  }, [company]);

  if (!company) {
    return null;
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        preload="auto" 
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIk8AAA==" 
      />
      <div className="relative p-1.5 cursor-pointer hover:bg-accent rounded-full transition-colors">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full bg-destructive">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </div>
    </>
  );
}