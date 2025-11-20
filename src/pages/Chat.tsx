"use client";

import { useState, useEffect, useRef } from "react";
import { useOutlet<dyad-write path="src/pages/Chat.tsx" description="Corrigindo TS2741: adicionando 'time: new Date()' obrigatório ao objeto msg em sendMessage()">
```tsx
"use<dyad-write path="src/pages/Chat.tsx" description="Corrigindo TS2741: adicionando 'time: new Date()' obrigatório na função sendMessage()">
"use client";

import { useState<dyad-problem-report summary="8 problems">
<problem file="src/pages/Chat.tsx" line="15" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="4" column="33" code="2307">Cannot find module '~/modules/channels/evolution/CreateInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="5" column="33" code="2307">Cannot find module '~/modules/channels/evolution/ManageInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="9" column="24" code="2307">Cannot find module '~/layouts/MainLayout' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="22" column="24" code="2307">Cannot find module '~/lib/convex' or its corresponding type declarations.</problem>
<problem file="src/layouts/MainLayout.tsx" line="12" column="24" code="2307">Cannot find module '~/components/SidebarNav' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/CreateInstanceModal.tsx" line="9" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/ManageInstanceModal.tsx" line="8" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
</dyad-problem-report><think>[REDACTED]</think><dyad-write path="src/lib/evolution.ts" description="Evolution API client to resolve multiple TS2307 errors.">
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
  sendText: async (instanceName: string, number: string, text: string): Promise<AxiosResponse<EvolutionResponse>> =>
    api.post(`/message/send<dyad-problem-report summary="8 problems">
<problem file="src/pages/Chat.tsx" line="15" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="4" column="33" code="2307">Cannot find module '~/modules/channels/evolution/CreateInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/pages/Channels.tsx" line="5" column="33" code="2307">Cannot find module '~/modules/channels/evolution/ManageInstanceModal' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="9" column="24" code="2307">Cannot find module '~/layouts/MainLayout' or its corresponding type declarations.</problem>
<problem file="src/App.tsx" line="22" column="24" code="2307">Cannot find module '~/lib/convex' or its corresponding type declarations.</problem>
<problem file="src/layouts/MainLayout.tsx" line="12" column="24" code="2307">Cannot find module '~/components/SidebarNav' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/CreateInstanceModal.tsx" line="9" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
<problem file="src/modules/channels/evolution/ManageInstanceModal.tsx" line="8" column="30" code="2307">Cannot find module '~/lib/evolution' or its corresponding type declarations.</problem>
</dyad-problem-report><think>[REDACTED]</think>Todos os 8 erros TS2307 são causados por falha na resolução do alias `~` (path mapping ausente no tsconfig). Criando/atualizando os arquivos ausentes e configurando `tsconfig.app.json` com `paths` para `~/*` → `["src/*"]` (compatível com `vite.config.ts`).

<dyad-write path="tsconfig.app.json" description="Configurando paths para aliases ~ e @ resolver TS2307 em todos os imports.">
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"],
      "@/*": ["src/*"]
    },
    "jsx": "react-jsx",
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.jsx",
    "src/**/*.js"
  ]
}