"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import MainLayout from '@/layouts/MainLayout';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Companies from '@/pages/Companies';
import Channels from '@/pages/Channels';
import Customers from '@/pages/Customers';
import Catalog from '@/pages/Catalog';
import Kanban from '@/pages/Kanban';
import Analytics from '@/pages/Analytics';
import Automations from '@/pages/Automations';
import Reports from '@/pages/Reports';
import Agendamento from '@/pages/Agendamento';
import Admin from '@/pages/Admin';
import Settings from '@/pages/Settings';
import Chat from '@/pages/Chat';
import WhatsApp from '@/pages/WhatsApp';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="channels" element={<Channels />} />
          <Route path="chat" element={<Chat />} />
          <Route path="whatsapp" element={<WhatsApp />} />
          <Route path="customers" element={<Customers />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="automations" element={<Automations />} />
          <Route path="reports" element={<Reports />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="settings" element={<Settings />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}