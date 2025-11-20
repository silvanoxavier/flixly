"use client";

import { NavLink } from "react-router-dom";
import { MessageCircle, BarChart3, FileText, Package, Building, Users, Zap, LayoutList, Phone, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reports", label: "Relatórios", icon: FileText },
  { href: "/catalog", label: "Catálogo", icon: Package },
  { href: "/companies", label: "Empresas", icon: Building },
  { href: "/customers", label: "Clientes", icon: Users },
  { href: "/automations", label: "Automations", icon: Zap },
  { href: "/kanban", label: "Kanban", icon: LayoutList },
  { href: "/channels", label: "Canais", icon: Phone },
  { href: "/settings", label: "Configurações", icon: Settings },
];

const SidebarNav = () => (
  <nav className="p-4 space-y-2">
    {navItems.map(({ href, label, icon: Icon }) => (
      <NavLink key={href} to={href} className={({ isActive }) => cn("flex items-center space-x-2 w-full p-3 rounded-lg transition-colors", isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </NavLink>
    ))}
  </nav>
);

export default SidebarNav;