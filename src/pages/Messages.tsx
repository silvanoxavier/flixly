"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, MessageCircle, User } from "lucide-react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

interface Chat {
  id: number;
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="flex h-full md:flex-row flex-col">
      {/* Chat List responsiva */}
      <div className="w-full md:w-72 lg:w-80 xl:w-96 border-r bg-card flex-shrink-0 flex flex-col">
        <ChatList onSelectChat={setSelectedChat} />
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedChat ? (
          <>
            <div className="border-b bg-card/80 backdrop-blur p-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">João Silva</h3>
                  <p className="text-xs text-muted-foreground">online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
              </div>
            </div>
            <ChatWindow />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Selecione uma conversa</h3>
              <p>Escolha uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}