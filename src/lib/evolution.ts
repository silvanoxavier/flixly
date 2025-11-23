"use client";

import axios, { AxiosResponse } from "axios";
import { supabase } from "~/lib/supabase";

interface EvolutionResponse<T = any> {
  status: boolean;
  data: T;
}

const API_URL = import.meta.env.EVOLUTION_API_URL || "http://localhost:8080";
const API_KEY = import.meta.env.EVOLUTION_API_KEY || "";

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

  listInstances: async (): Promise<AxiosResponse<EvolutionResponse<{ instances: any[] }>>> =>
    api.get("/manager/getInstances"),

  getInstance: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.get(`/manager/getInstance/${instanceName}`),

  getQRCode: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ qrCode: string }>>> =>
    api.get(`/instance/fetchQR/${instanceName}`),

  getConnectionState: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ status: string }>>> =>
    api.get(`/instance/fetchStatus/${instanceName}`),

  sendText: async (
    instanceName: string, 
    number: string, 
    text: string,
    companyId: string,
    conversationId?: string
  ): Promise<AxiosResponse<EvolutionResponse>> => {
    const res = await api.post(`/message/sendText/${instanceName}/${number}`, { text });

    // Sync outgoing to Supabase (assumes triggers update conversation)
    if (res.data.status && companyId) {
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        company_id: companyId,
        text,
        sender_type: 'bot', // outgoing
        read_at: new Date().toISOString(),
      });
    }

    return res;
  },

  sendMedia: async (
    instanceName: string,
    number: string,
    mediatype: "image" | "audio" | "video" | "document" | "sticker",
    media: string,
    caption?: string
  ): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendMedia/${instanceName}/${number}`, { mediatype, media, caption }),
};