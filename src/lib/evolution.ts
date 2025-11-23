"use client";

import axios, { AxiosResponse } from "axios";
import { supabase } from "@/lib/supabase";

interface EvolutionResponse<T = any> {
  status: boolean;
  data: T;
}

const API_URL = import.meta.env.VITE_EVOLUTION_API_URL || "http://localhost:8080";
const API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY || "";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "apikey": API_KEY,
  },
});

export const evolutionApi = {
  createInstance: async (
    instanceName: string,
    channel: string = "baileys",
    token?: string,
    number?: string
  ): Promise<AxiosResponse<EvolutionResponse<{ qrCode?: string }>>> =>
    api.post("/manager/createInstance", { 
      instanceName, 
      channel, 
      token, 
      number, 
      qrcode: true 
    }),

  getQRCode: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ qrCode: string }>>> =>
    api.get(`/instance/fetchQR/${instanceName}`),

  sendText: async (
    instanceName: string, 
    number: string, 
    text: string,
    companyId: string,
    conversationId?: string
  ): Promise<AxiosResponse<EvolutionResponse>> => {
    const res = await api.post(`/message/sendText/${instanceName}/${number}`, { text });

    // Sync outgoing to Supabase realtime
    if (res.data.status && companyId && conversationId) {
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        company_id: companyId,
        text,
        sender_type: 'bot',
        read_at: new Date().toISOString(),
      });
    }

    return res;
  },
};