"use client";

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SidebarNav from '~/components/SidebarNav';
import UserInfo from '@/components/UserInfo';
import NotificationsMenu from '@/components/NotificationsMenu';
import ChatNotificationBell from '@/components/ChatNotificationBell';
import CompanySelector from '@/components/CompanySelector';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Building2 } from "lucide-react";
import { useCompany } from '@/providers/CompanyProvider';

interface Company {
  id: string;
  nome_fantasia: string;
  name?: string;
  instance?: string;
  cnpj?: string;
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { selectedCompany } = useCompany();

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarNav expanded={true} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ${expanded ? 'w-64' : 'w-20'} border-r bg-card/50 backdrop-blur flex-shrink-0`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${expanded ? 'block' : 'hidden'}`}>
            <Building2 className="h-6 w-6" />
            <span className="font-bold text-lg">Flixly</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="h-9 w-9"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <SidebarNav expanded={expanded} onNavClick={() => expanded && setExpanded(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-40 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CompanySelector />
          </div>
          <div className="flex items-center space-x-2">
            <ChatNotificationBell />
            <NotificationsMenu />
            <UserInfo company={selectedCompany || undefined} />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet context={{ company: selectedCompany } as { company: Company | null }} />
        </main>
      </div>
    </div>
  );
}