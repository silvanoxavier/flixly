"use client";

import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  MessageCircle, 
  Smartphone, 
  FileBarChart, 
  Settings 
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/channels", label: "Canais", icon: Smartphone },
  { href: "/customers", label: "Clientes", icon: Users },
  { href: "/messages", label: "Mensagens", icon: MessageCircle },
  { href: "/reports", label: "Relatórios", icon: FileBarChart },
  { href: "/settings", label: "Configurações", icon: Settings },
];

interface SidebarNavProps {
  expanded: boolean;
}

export default function SidebarNav({ expanded }: SidebarNavProps) {
  return (
    <nav className="flex flex-col h-full p-2 md:p-4 space-y-2 pt-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `group flex items-center p-3 rounded-lg transition-all duration-200 overflow-hidden ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            } ${expanded ? 'space-x-3 pl-3' : 'justify-center pl-2'}`
          }
        >
          <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform ${expanded ? 'group-hover:scale-110' : ''}`} />
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-300 ${
              expanded 
                ? 'opacity-100 translate-x-0 ml-3' 
                : 'opacity-0 scale-75 -translate-x-4 w-0 ml-0'
            }`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}