"use client";

import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Users, 
  Package, 
  LayoutDashboard,
  Calendar 
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { icon: MessageCircle, label: "Chat", path: "/chat" },
  { icon: Users, label: "Clientes", path: "/customers" },
  { icon: Package, label: "Catálogo", path: "/catalog" },
  { icon: LayoutDashboard, label: "Kanban", path: "/kanban" },
  { icon: Calendar, label: "Agendamento", path: "/agendamento" },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button key={index} variant="outline" asChild className="h-20 flex flex-col gap-2 p-4 h-auto">
            <Link to={action.path}>
              <Icon className="h-6 w-6" />
              <span className="font-medium text-sm">{action.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}