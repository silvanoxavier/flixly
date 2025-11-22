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