"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bell } from 'lucide-react';
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
      audioRef.current.play().catch(console.error);
    }
  };

  const fetchUnreadCount = useCallback(async (conversationIds: string[]) => {
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

    if (!error && count !== null) {
      setUnreadCount(count);
    }
  }, [company?.id]);

  useEffect(() => {
    if (!company?.id) {
      setUnreadCount(0);
      return;
    }

    let conversationIds: string[] = [];
    let channelRef = supabase.channel(`chat-messages-${company.id}`);

    const setupSubscription = async () => {
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .eq('company_id', company.id);

      if (convError || !conversations) {
        console.error("Error fetching conversations:", convError);
        return;
      }
      
      conversationIds = conversations.map((c: any) => c.id);
      await fetchUnreadCount(conversationIds);

      channelRef
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `company_id=eq.${company.id}`
          },
          (payload: any) => {
            if (payload.new && !payload.new.read_at && payload.new.sender_type !== 'bot') {
              playNotificationSound();
              fetchUnreadCount(conversationIds);
            }
          }
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      supabase.removeChannel(channelRef);
    };
  }, [company, fetchUnreadCount]);

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