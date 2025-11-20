"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const chats = [
  { id: 1, name: "João Silva", lastMsg: "Tudo bem?", time: "14:30", unread: 2, avatar: "JS" },
  { id: 2, name: "Maria Santos", lastMsg: "Confirma o pedido?", time: "14:20", unread: 0, avatar: "MS" },
  { id: 3, name: "Pedro Lima", lastMsg: "Obrigado!", time: "14:10", unread: 1, avatar: "PL" },
];

interface ChatListProps {
  onSelectChat: (chat: any) => void;
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b font-semibold text-foreground">Conversas</div>
      <div className="flex-1 overflow-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-accent cursor-pointer border-b border-transparent hover:border-muted flex items-center space-x-3"
            onClick={() => onSelectChat(chat)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">{chat.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="truncate font-medium text-foreground">{chat.name}</div>
                <div className="text-xs text-muted-foreground ml-2">{chat.time}</div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">{chat.lastMsg}</p>
                {chat.unread > 0 && <Badge className="text-xs ml-auto">{chat.unread}</Badge>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}