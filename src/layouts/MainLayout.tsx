"use client";

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const { setTheme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname as keyof typeof pageTitles] || "Flixly";

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Overlay SEMPRE (desktop + mobile) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="p-4 md:p-6 fixed z-50 top-0 left-0 md:relative md:z-auto">
          <Menu className="h-6 w-6 text-foreground" />
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 border-r bg-card max-w-xs">
          <SidebarNav />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-0">
        {/* Header MARROM (search global + company + theme) */}
        <header className="border-b bg-card/80 backdrop-blur-sm p-4 md:p-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <h2 className="text-xl font-semibold text-foreground hidden md:block">{currentTitle}</h2>
          </div>
          <div className="flex items-center space-x-2 flex-1 max-w-2xl mx-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Pesquisar mensagens, clientes..."
                className="pl-10 w-full"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedCompany.id} onValueChange={(id) => setSelectedCompany(companies.find(c => c.id === id)!)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {companies.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon">
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

        {/* Content */}
        <main className="flex-1 overflow-auto p-0 md:p-6">
          <Outlet context={{ company: selectedCompany }} />
        </main>
      </div>
    </div>
  );
}