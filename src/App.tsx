"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useOutletContext } from "react-router-dom";
import { ConvexProvider } from "convex/react";
import MainLayout from "~/layouts/MainLayout";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Catalog from "./pages/Catalog";
import Companies from "./pages/Companies";
import Customers from "./pages/Customers";
import Automations from "./pages/Automations";
import Kanban from "./pages/Kanban";
import Channels from "./pages/Channels";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { convex } from "~/lib/convex";

const queryClient = new QueryClient();

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {import.meta.env.VITE_CONVEX_URL ? (
        <ConvexProvider client={convex}>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="chat" element={<Chat />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="companies" element={<Companies />} />
                <Route path="customers" element={<Customers />} />
                <Route path="automations" element={<Automations />} />
                <Route path="kanban" element={<Kanban />} />
                <Route path="channels" element={<Channels />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ConvexProvider>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="chat" element={<Chat />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="reports" element={<Reports />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="companies" element={<Companies />} />
              <Route path="customers" element={<Customers />} />
              <Route path="automations" element={<Automations />} />
              <Route path="kanban" element={<Kanban />} />
              <Route path="channels" element={<Channels />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => <AppContent />;

export default App;