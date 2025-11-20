import axios, { AxiosResponse } from "axios";

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

  sendText: async (instanceName: string, number: string, text: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendText/${instanceName}/${number}`, { text }),

  sendMedia: async (
    instanceName: string,
    number: string,
    mediatype: "image" | "audio" | "video" | "document" | "sticker",
    media: string,
    caption?: string
  ): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendMedia/${instanceName}/${number}`, { mediatype, media, caption }),
};