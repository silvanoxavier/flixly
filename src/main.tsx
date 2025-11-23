"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { CompanyProvider } from './providers/CompanyProvider';
import { Toaster } from '@/components/ui/toaster';

// Sentry init (prod only)
if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0, // Capture 100% traces em prod (ajuste para 0.2)
    environment: import.meta.env.PROD ? 'production' : 'development',
    beforeSend(event) {
      // Filtra erros dev/irrelevantes
      if (import.meta.env.DEV) return null;
      return event;
    },
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <CompanyProvider>
            <App />
            <Toaster />
          </CompanyProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>
);