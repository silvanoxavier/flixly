"use client";

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Search, Sun, Moon, Monitor, Building2 } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import SidebarNav from "~/components/SidebarNav";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";

interface Company {
  empresa_id: string;
  nome_fantasia: string;
  cnpj: string;
}

export default function MainLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const { setTheme } = useTheme();

  // Protect: redirect to auth if no session
  useEffect(() => {
    if (!loading && !session) {
      navigate('/auth', { replace: true });
    }
  }, [loading, session, navigate]);

  // Fetch real companies via RPC get_client_companies
  useEffect(() => {
    if (!session?.user.id) return;

    const fetchCompanies = async () => {
      setCompaniesLoading(true);
      try {
        const { data, error } = await supabase.rpc('get_client_companies', {
          client_user_id: session.user.id
        });
        if (error) throw error;
        setCompanies(data || []);
        if (data.length > 0) setSelectedCompany(data[0]);
      } catch (error) {
        console.error('Erro companies:', error);
      } finally {
        setCompaniesLoading(false);
      }
    };

    fetchCompanies();
  }, [session]);

  const handleMouseEnter = () => setSidebarExpanded(true);
  const handleMouseLeave = () => setTimeout(() => setSidebarExpanded(false), 150);
  const handleNavClick = () => setSidebarExpanded(false);

  const pageTitles: Record<string, string> = {
    "/": "Início",
    "/dashboard": "Dashboard",
    "/companies": "Empresas",
    // ... outros
  };

  const currentTitle = pageTitles[location.pathname as keyof typeof pageTitles] || "Flixly";

  const baseSidebarClasses = "hidden md:block md:fixed md:left-0 md:top-20 md:h-[calc(100vh-5rem)] md:border-r md:bg-card/95 md:overflow-y-auto md:transition-all md:duration-400 md:ease-out";
  const expandedSidebarClasses = sidebarExpanded 
    ? "md:w-64 md:z-50 md:shadow-xl md:shadow-primary/10" 
    : "md:w-16 md:z-40 md:shadow-sm";
  
  const sidebarClasses = `${baseSidebarClasses} ${expandedSidebarClasses}`;
  const headerPaddingTop = 'pt-16 md:pt-20';

  if (loading || companiesLoading) {
    return <div className="flex items-center justify-center h-screen"><Skeleton className="h-12 w-48" /></div>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 border-b bg-card/90 backdrop-blur-sm z-50 flex items-center px-4 md:px-6">
        <div className="flex items-center space-x-3 min-w-0 flex-1 max-w-md">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-black text-lg md:text-xl text-primary-foreground tracking-tight">F</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Flixly</h1>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-foreground truncate hidden md:block ml-2">{currentTitle}</h2>
        </div>
        <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Pesquisar mensagens, clientes..." className="pl-10 w-full h-12 rounded-full" value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center space-x-2 min-w-0 flex-1 max-w-md justify-end">
          <Select value={selectedCompany?.empresa_id || ''} onValueChange={(id) => {
            const company = companies.find(c => c.empresa_id === id);
            setSelectedCompany(company || null);
          }}>
            <SelectTrigger className="w-44 md:w-48 h-12">
              <SelectValue placeholder="Selecione empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(c => (
                <SelectItem key={c.empresa_id} value={c.empresa_id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {c.nome_fantasia} <span className="text-xs text-muted-foreground ml-2">({c.cnpj})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
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

      {/* Sidebar */}
      <aside 
        className={sidebarClasses} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <SidebarNav expanded={sidebarExpanded} onNavClick={handleNavClick} />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className={`w-80 p-0 border-r bg-card max-w-xs ${headerPaddingTop} md:hidden`}>
          <SidebarNav expanded={true} onNavClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${headerPaddingTop} md:ml-16 min-w-0 transition-none`}>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet context={{ company: selectedCompany }} />
        </main>
      </div>
    </div>
  );
}