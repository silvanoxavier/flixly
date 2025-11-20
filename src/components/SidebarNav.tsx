"use client";

import { NavLink } from "react-router-dom";
import { 
  Home,
  LayoutDashboard, 
  Building2,
  Users, 
  Smartphone, 
  MessagesSquare,
  MessageCircle,
  Package,
  Columns3,
  BarChart3,
  Zap,
  FileBarChart, 
  Settings 
} from "lucide-react";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Empresas", icon: Building2 },
  { href: "/channels", label: "Canais", icon: Smartphone },
  { href: "/customers", label: "Clientes", icon: Users },
  { href: "/chat", label: "Chat", icon: MessagesSquare },
  { href: "/messages", label: "Mensagens", icon: MessageCircle },
  { href: "/catalog", label: "Catálogo", icon: Package },
  { href: "/kanban", label: "Kanban", icon: Columns3 },
  { href: "/analytics", label: "Análises", icon: BarChart3 },
  { href: "/automations", label: "Automações", icon: Zap },
  { href: "/reports", label: "Relatórios", icon: FileBarChart },
  { href: "/settings", label: "Configurações", icon: Settings },
];

interface SidebarNavProps {
  expanded: boolean;
}

export default function SidebarNav({ expanded }: SidebarNavProps) {
  return (
    <nav className="flex flex-col h-full p-3 space-y-1.5">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `group flex items-center rounded-lg transition-all duration-200 overflow-hidden h-11 ${
              isActive
                ? "bg-primary/90 text-primary-foreground shadow-md border border-primary/50"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:shadow-sm"
            } ${expanded ? 'pl-3 space-x-2.5 justify-start' : 'justify-center px-2.5' }`
          }
        >
          <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${expanded ? 'scale-105' : 'group-hover:scale-105'}`} />
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-300 origin-left text-sm ${
              expanded 
                ? 'opacity-100 scale-100 translate-x-0 w-auto ml-2.5' 
                : 'opacity-0 scale-75 -translate-x-2 w-0 ml-0 invisible'
            }`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}