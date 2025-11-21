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
  Settings,
  ChevronDown,
  LogOut,
  Calendar,
  Lock // Importar o ícone Lock
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Início", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Empresas", icon: Building2 },
  { 
    label: "Canais", 
    icon: Smartphone,
    children: [
      { href: "/channels", label: "Gerenciar Canais", icon: Smartphone },
      { href: "/chat", label: "Chat no Site", icon: MessagesSquare },
      { href: "/whatsapp", label: "WhatsApp", icon: MessageCircle },
    ]
  },
  { href: "/customers", label: "Clientes", icon: Users },
  { href: "/catalog", label: "Catálogo", icon: Package },
  { href: "/kanban", label: "Kanban", icon: Columns3 },
  { href: "/analytics", label: "Análises", icon: BarChart3 },
  { href: "/automations", label: "Automações", icon: Zap },
  { href: "/reports", label: "Relatórios", icon: FileBarChart },
  { href: "/agendamento", label: "Agendamento", icon: Calendar },
  { href: "/settings", label: "Configurações", icon: Settings },
  { href: "/admin", label: "Administração", icon: Lock }, // Adicionar o link para Admin
];

interface SidebarNavProps {
  expanded: boolean;
  onNavClick?: () => void;
}

export default function SidebarNav({ expanded, onNavClick }: SidebarNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleParentClick = (label: string) => {
    if (!expanded) {
      setOpenSubmenu(openSubmenu === label ? null : label);
    } else {
      setOpenSubmenu(null); // Close submenu if sidebar is fully expanded
    }
  };

  return (
    <nav className="flex flex-col h-full p-3 space-y-1.5 pt-1">
      {navItems.map((item) => (
        <div key={item.label}>
          {item.href ? (
            <NavLink
              to={item.href}
              onClick={onNavClick}
              className={({ isActive }) =>
                `group flex items-center rounded-lg transition-all duration-200 overflow-hidden h-11 ${
                  isActive
                    ? "bg-primary/90 text-primary-foreground shadow-md border border-primary/50"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:shadow-sm"
                } ${expanded ? 'pl-3 space-x-2.5 justify-start' : 'justify-center px-2.5' } ${item.label === 'Sair' ? 'mt-auto border-t border-border/50 pt-4 mt-8' : ''}`
              }
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${expanded ? 'scale-105' : 'group-hover:scale-105'} ${item.label === 'Sair' ? 'text-destructive' : ''}`} />
              <span 
                className={`font-medium whitespace-nowrap transition-all duration-300 origin-left text-sm ${
                  expanded 
                    ? 'opacity-100 scale-100 translate-x-0 w-auto ml-2.5' 
                    : 'opacity-0 scale-75 -translate-x-2 w-0 ml-0 invisible'
                } ${item.label === 'Sair' ? 'text-destructive' : ''}`}
              >
                {item.label}
              </span>
            </NavLink>
          ) : (
            // Parent item with children
            <div 
              className={`group flex items-center rounded-lg transition-all duration-200 overflow-hidden h-11 cursor-pointer ${
                openSubmenu === item.label && !expanded
                  ? "bg-accent/50 text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:shadow-sm"
              } ${expanded ? 'pl-3 space-x-2.5 justify-start' : 'justify-center px-2.5' }`}
              onClick={() => handleParentClick(item.label)}
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
              {item.children && expanded && (
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${openSubmenu === item.label ? 'rotate-180' : ''}`} />
              )}
            </div>
          )}

          {/* Render children if parent is active or sidebar is expanded */}
          {item.children && (expanded || openSubmenu === item.label) && (
            <div className={`pl-6 ${expanded ? 'block' : 'absolute left-full top-0 bg-card shadow-lg rounded-md py-2 w-48 z-50'}`}>
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href!}
                  onClick={onNavClick}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg transition-colors duration-200 h-9 ${
                      isActive
                        ? "bg-primary/90 text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    } ${expanded ? 'pl-3 space-x-2.5 justify-start' : 'justify-center px-2.5' }`
                  }
                >
                  <child.icon className="h-4 w-4 flex-shrink-0" />
                  <span 
                    className={`font-medium whitespace-nowrap text-sm ${
                      expanded 
                        ? 'opacity-100 scale-100 translate-x-0 w-auto ml-2.5' 
                        : 'opacity-0 scale-75 -translate-x-2 w-0 ml-0 invisible'
                    }`}
                  >
                    {child.label}
                  </span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Fixed logout at bottom */}
      <div className="border-t border-border/50 pt-4 shrink-0">
        <NavLink
          to="/auth"
          onClick={onNavClick}
          className={({ isActive }) =>
            `group flex items-center rounded-lg transition-all duration-200 overflow-hidden h-11 ${
              isActive
                ? "bg-destructive/90 text-destructive-foreground shadow-md border border-destructive/50"
                : "text-destructive hover:bg-destructive/10 hover:text-destructive hover:shadow-sm"
            } ${expanded ? 'pl-3 space-x-2.5 justify-start' : 'justify-center px-2.5' }`
          }
        >
          <LogOut className="h-5 w-5 flex-shrink-0 transition-transform duration-200" />
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-300 origin-left text-sm ${
              expanded 
                ? 'opacity-100 scale-100 translate-x-0 w-auto ml-2.5' 
                : 'opacity-0 scale-75 -translate-x-2 w-0 ml-0 invisible'
            }`}
          >
            Sair
          </span>
        </NavLink>
      </div>
    </nav>
  );
}