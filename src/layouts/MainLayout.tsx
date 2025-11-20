"use client";

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Search, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import SidebarNav from "~/components/SidebarNav";

const companies = [
  { id: "1", name: "Empresa A", instance: "inst1" },
  { id: "2", name: "Empresa B", instance: "inst2" },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/channels": "Canais",
  "/customers": "Clientes",
  "/messages": "Mensagens",
  "/reports": "Relatórios",
  "/settings": "Configurações",
};

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { setTheme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname as keyof typeof pageTitles] || "Flixly";

  // Delay mouseleave UX
  const handleMouseEnter = () => setSidebarExpanded(true);
  const handleMouseLeave = () => setTimeout(() => setSidebarExpanded(false), 200);

  const sidebarWidth = sidebarExpanded ? 'w-64' : 'w-16';
  const mainMargin = sidebarExpanded ? 'lg:ml-64' : 'lg:ml-16';
  const headerHeight = 'h-16 md:h-20';
  const sidebarPaddingTop = 'pt-16 md:pt-20';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Header FIXED full width */}
      <header className={`fixed top-0 left-0 right-0 ${headerHeight} border-b bg-card/90 backdrop-blur-sm z-50 flex items-center px-4 md:px-6`}>
        {/* Left: Hamburger MOBILE ONLY + Logo + Title */}
        <div className="flex items-center space-x-3 min-w-0 flex-1 max-w-md">
          {/* Hamburger MOBILE ONLY (lg:hidden) */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          {/* Logo Flixly */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-black text-lg md:text-xl text-primary-foreground tracking-tight">F</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Flixly</h1>
            </div>
          </div>
          {/* Title */}
          <h2 className="text-lg font-semibold text-foreground truncate hidden md:block ml-2">{currentTitle}</h2>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar mensagens, clientes..."
              className="pl-10 w-full h-12 rounded-full"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Company + Theme */}
        <div className="flex items-center space-x-2 min-w-0 flex-1 max-w-md justify-end">
          <Select value={selectedCompany.id} onValueChange={(id) => setSelectedCompany(companies.find(c => c.id === id)!)}>
            <SelectTrigger className="w-44 md:w-48 h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="h-12 w-12">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}><Sun className="mr-2 h-4 w-4" /> Claro</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}><Moon className="mr-2 h-4 w-4" /> Escuro</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}><Monitor className="mr-2 h-4 w-4" /> Sistema</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop Sidebar: ÍCONES SEMPRE VISÍVEIS lg+ (narrow w-16, hover w-64) */}
      <aside 
        className={`hidden lg:block ${sidebarWidth} bg-card/95 border-r transition-all duration-300 ease-out shadow-sm h-screen ${sidebarPaddingTop} overflow-hidden z-40`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarNav expanded={sidebarExpanded} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className={`w-80 p-0 border-r bg-card max-w-xs ${sidebarPaddingTop} lg:hidden`}>
          <SidebarNav expanded={true} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarPaddingTop} ${mainMargin} lg:transition-all lg:duration-300 lg:ease-out`}>
        <main className="flex-1 overflow-auto p-0 md:p-6">
          <Outlet context={{ company: selectedCompany }} />
        </main>
      </div>
    </div>
  );
}