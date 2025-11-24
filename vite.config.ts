import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import sentryVitePlugin from "@sentry/vite-plugin"; // ✅ Default import v4+
import path from "path";

export default defineConfig(() => {
  const plugins = [
    dyadComponentTagger(), 
    react(),
  ];

  // ✅ Sentry só em PROD + authToken presente (evita erro dev)
  if (import.meta.env.PROD && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(sentryVitePlugin({
      org: "seu-org", // Substitua pela sua org Sentry
      project: "flixly",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }));
  }

  return {
    server: {
      host: "::",
      port: 32136, // ✅ Porta fixa (ignore --port 32100 override)
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