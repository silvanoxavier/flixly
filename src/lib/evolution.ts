import axios, { AxiosResponse } from "axios";

interface EvolutionResponse<T = any> {
  status: string; // Status da conexão (CONNECTED, DISCONNECTED, QRCODE, CONNECTING)
  data: T;
}

const API_URL = import.meta.env.EVOLUTION_API_URL || "http://localhost:8080";
const API_KEY = import.meta.env.EVOLUTION_API_KEY || "";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "apikey": API_KEY, // Usando 'apikey' conforme a documentação
  },
});

export const evolutionApi = {
  // Envio de Mensagem de Texto
  sendText: async (instanceName: string, number: string, text: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendText/${instanceName}`, { number, text }),

  // Envio de Mensagem com Mídia
  sendMedia: async (instanceName: string, number: string, mediatype: "image" | "video", media: string, caption?: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/sendMedia/${instanceName}`, { number, mediatype, media, caption }),

  // Obtenção do Status da Conexão
  getConnectionState: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ status: string }>>> =>
    api.get(`/instance/connectionState/${instanceName}`),

  // Geração do QR Code
  getQRCode: async (instanceName: string): Promise<AxiosResponse<EvolutionResponse<{ qrCode: string }>>> =>
    api.get(`/instance/qrCode/${instanceName}`),

  // Listar instâncias (mantido do original, se aplicável)
  listInstances: async (): Promise<AxiosResponse<EvolutionResponse<string[]>>> =>
    api.get("/instance/listInstances"),
};