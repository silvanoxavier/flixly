import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import * as Sentry from "@sentry/vite-plugin";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 32136,
  },
  plugins: [
    dyadComponentTagger(), 
    react(),
    Sentry.vitePlugin({
      org: "seu-org", // Substitua pela sua org Sentry
      project: "flixly", // Nome do projeto Sentry
      authToken: process.env.SENTRY_AUTH_TOKEN, // Opcional: sentry.io/settings/account/api/auth-tokens
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
      "@fullcalendar/core/locales": path.resolve(__dirname, "./node_modules/@fullcalendar/core/locales"),
    },
  },
}));