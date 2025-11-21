"use client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Companies from "@/pages/Companies";
import Channels from "@/pages/Channels";
import Customers from "@/pages/Customers";
import Chat from "@/pages/Chat";
import WhatsApp from "@/pages/WhatsApp";
import Catalog from "@/pages/Catalog";
import Kanban from "@/pages/Kanban";
import Analytics from "@/pages/Analytics";
import Automations from "@/pages/Automations";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Agendamento from "@/pages/Agendamento";
import Admin from "@/pages/Admin"; // Importar a nova página Admin
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "companies", element: <Companies /> },
      { path: "channels", element: <Channels /> },
      { path: "customers", element: <Customers /> },
      { path: "chat", element: <Chat /> },
      { path: "whatsapp", element: <WhatsApp /> },
      { path: "catalog", element: <Catalog /> },
      { path: "kanban", element: <Kanban /> },
      { path: "analytics", element: <Analytics /> },
      { path: "automations", element: <Automations /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { path: "agendamento", element: <Agendamento /> },
      { path: "admin", element: <Admin /> }, // Adicionar a rota para Admin
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}