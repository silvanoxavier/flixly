"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import MainLayout from "~/layouts/MainLayout";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Automations from "./pages/Automations";
import Kanban from "./pages/Kanban";
import Channels from "./pages/Channels";
import Settings from "./pages/Settings";
import Companies from "./pages/Companies";
import Customers from "./pages/Customers";
import Chat from "./pages/Chat";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Sonner />
    </BrowserRouter>
  );
}

export default App;