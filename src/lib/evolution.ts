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