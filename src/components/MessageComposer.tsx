"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile } from "lucide-react";
import { useState } from 'react';

interface MessageComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function MessageComposer({ onSend, disabled = false }: MessageComposerProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="border-t p-4 bg-card flex items-end space-x-2">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Smile className="h-4 w-4" />
      </Button>
      <Input 
        placeholder="Digite uma mensagem..." 
        className="flex-1 min-h-[44px] rounded-full" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        disabled={disabled}
      />
      <Button 
        size="icon" 
        className="h-12 w-12 bg-primary hover:bg-primary/90" 
        onClick={handleSend}
        disabled={!input.trim() || disabled}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}