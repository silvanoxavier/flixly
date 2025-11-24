import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import * as sentryVitePlugin from "@sentry/vite-plugin"; // Importa como módulo
import path from "path";

export default defineConfig(({ mode }) => { // Recebe 'mode' para verificar o ambiente
  const plugins = [
    dyadComponentTagger(), 
    react(),
  ];

  // Ativa o plugin Sentry apenas em modo de produção e se o token de autenticação estiver disponível
  if (mode === 'production' && import.meta.env.VITE_SENTRY_AUTH_TOKEN) { // Usa import.meta.env para variáveis de ambiente
    plugins.push(sentryVitePlugin.vitePlugin({ // Acessa a função 'vitePlugin' do módulo
      org: "seu-org", // Substitua pela sua org Sentry
      project: "flixly",
      authToken: import.meta.env.VITE_SENTRY_AUTH_TOKEN, // Usa import.meta.env
    }));
  }

  return {
    server: {
      host: "::",
      port: 32136, // Porta fixa
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src"),
        "@fullcalendar/core/locales": path.resolve(__dirname, "./node_modules/@fullcalendar/core/locales"),
      },
    },
  };
});