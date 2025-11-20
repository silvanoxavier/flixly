"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes<dyad-problem-report summary="8 problems">
<problem file="src/pages/Chat.tsx" line="15" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="4" column="33" code="2307">Cannot find module '~/modules/channels/evolution/CreateInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="5" column="33" code="2307">Cannot find module '~/modules/channels/evolution/ManageInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="9" column="24" code="2307">Cannot find module '~/layouts/MainLayout' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="22" column="24" code="2307">Cannot find module '~/lib/convex' or its corresponding type declarations.</problem>
<problem file="src/layouts/MainLayout.tsx" line="11" column="24" code="2307">Cannot find module '~/components/SidebarNav' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/CreateInstanceModal.tsx" line="9" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/ManageInstanceModal.tsx" line="8" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
</dyad-problem-report><think>[REDACTED]</think><dyad-write path="src/lib/evolution.ts" description="Typed Evolution API client (fixes TS2307 #1,7,8).">
import axios, { AxiosResponse } from "axios";

interface EvolutionResponse<T = any> {
  status: number;
  data: T;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_EVOLUTION_BASE_URL || "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_EVOLUTION_TOKEN || ""}`,
    "Content-Type": "application/json",
  },
});

export const evolutionApi = {
  sendMessage: async (instance: string, chatId: string, message: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendText/${instance}`, { phone: chatId, message }),
  getQR: async (instance: string): Promise<AxiosResponse<EvolutionResponse<string>>> =>
    api.get(`/instance/qr/${instance}`),
  getStatus: async (instance: string): Promise<AxiosResponse<EvolutionResponse<{ status: string }>>> =>
    api.get(`/instance/status/${instance}`),
  listInstances: async (): Promise<AxiosResponse<EvolutionResponse<string[]>>> =>
    api.get("/instance/listInstances"),
};