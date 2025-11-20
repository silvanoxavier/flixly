import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_EVOLUTION_BASE_URL || "http://localhost:8080",
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_EVOLUTION_TOKEN || ""}`,
    "Content-Type": "application/json",
  },
});

export const evolutionApi = {
  sendMessage: async (instance: string, chatId: string, message: any) => api.post(`/message/sendText/${instance}`, { phone: chatId, message }),
  getQR: async (instance: string) => api.get(`/instance/qr/${instance}`),
  getStatus: async (instance: string) => api.get(`/instance/status/${instance}`),
  listInstances: async () => api.get("/instance/listInstances"),
};