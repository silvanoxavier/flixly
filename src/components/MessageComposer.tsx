"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile } from "lucide-react";

export default function MessageComposer() {
  return (
    <div className="border-t p-4 bg-card flex items-end space-x-2">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Smile className="h-4 w-4" />
      </Button>
      <Input placeholder="Digite uma mensagem..." className="flex-1 min-h-[44px] rounded-full" />
      <Button size="icon" className="h-12 w-12 bg-primary hover:bg-primary/90">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}