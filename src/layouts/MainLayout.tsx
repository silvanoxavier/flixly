"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SidebarNav from "~/components/SidebarNav";

const companies = [
  { id: "1", name: "Empresa A", instance: "inst1" },
  { id: "2", name: "Empresa B", instance: "inst2" },
];

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger className="md:hidden p-4">
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 border-r">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Flixly</h1>
        </div>
        <SidebarNav />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
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
            
            {/* Theme Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet context={{ company: selectedCompany }} />
        </main>
      </div>
    </div>
  );
}