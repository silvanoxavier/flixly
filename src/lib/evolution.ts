import axios, { AxiosResponse } from "axios";

interface EvolutionResponse<T = any> {
  status: string;
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
    token?: string
  ): Promise<AxiosResponse<EvolutionResponse<{ qrCode?: string }>>> =>
    api.post("/instance/create", { instanceName, token, qrcode: true }),

  sendText: async (instanceName: string, number: string, text: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendText/${instanceName}`, { number, text }),

  sendMedia: async (
    instanceName: string,
    number: string,
    mediatype: "image" | "video",
    media: string,
    caption?: string
  ): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendMedia/${instanceName}`, { number, mediatype, media, caption }),

  getConnectionState: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ status: string }>>> =>
    api.get(`/instance/connectionState/${instanceName}`),

  getQRCode: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ qrCode: string }>>> =>
    api.get(`/instance/qrCode/${instanceName}`),

  listInstances: async (): Promise<AxiosResponse<EvolutionResponse<string[]>>> =>
    api.get("/instance/listInstances"),
};