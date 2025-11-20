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

export default function SidebarNav() {
  return (
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors w-full ${
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}