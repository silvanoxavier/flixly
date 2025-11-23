"use client";

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import MainLayout from '@/layouts/MainLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import { Skeleton } from '@/components/ui/skeleton';

const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
const LazyCompanies = lazy(() => import('@/pages/Companies'));
const LazyChannels = lazy(() => import('@/pages/Channels'));
const LazyCustomers = lazy(() => import('@/pages/Customers'));
const LazyCatalog = lazy(() => import('@/pages/Catalog'));
const LazyKanban = lazy(() => import('@/pages/Kanban'));
const LazyAnalytics = lazy(() => import('@/pages/Analytics'));
const LazyAutomations = lazy(() => import('@/pages/Automations'));
const LazyReports = lazy(() => import('@/pages/Reports'));
const LazyAgendamento = lazy(() => import('@/pages/Agendamento'));
const LazyAdmin = lazy(() => import('@/pages/Admin'));
const LazySettings = lazy(() => import('@/pages/Settings'));
const LazyChat = lazy(() => import('@/pages/Chat'));
const LazyWhatsApp = lazy(() => import('@/pages/WhatsApp'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/login" replace />;
}

const LazyFallback = () => (
  <div className="p-8 space-y-6">
    <Skeleton className="h-8 w-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
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
            <Route path="dashboard" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyDashboard />
              </Suspense>
            } />
            <Route path="companies" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyCompanies />
              </Suspense>
            } />
            <Route path="channels" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyChannels />
              </Suspense>
            } />
            <Route path="chat" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyChat />
              </Suspense>
            } />
            <Route path="whatsapp" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyWhatsApp />
              </Suspense>
            } />
            <Route path="customers" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyCustomers />
              </Suspense>
            } />
            <Route path="catalog" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyCatalog />
              </Suspense>
            } />
            <Route path="kanban" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyKanban />
              </Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyAnalytics />
              </Suspense>
            } />
            <Route path="automations" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyAutomations />
              </Suspense>
            } />
            <Route path="reports" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyReports />
              </Suspense>
            } />
            <Route path="agendamento" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyAgendamento />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<LazyFallback />}>
                <LazySettings />
              </Suspense>
            } />
            <Route path="admin" element={
              <Suspense fallback={<LazyFallback />}>
                <LazyAdmin />
              </Suspense>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}