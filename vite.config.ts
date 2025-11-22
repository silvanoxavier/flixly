import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 32136, // Alterado para 32136 para corresponder à URL do Supabase
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
      "@fullcalendar/core/locales": path.resolve(__dirname, "./node_modules/@fullcalendar/core/locales"),
    },
  },
}));