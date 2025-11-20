# Erros de Compilação Apresentados

## 1. **TS2741** - Propriedade obrigatória `time` ausente na interface `Message`
**Arquivo**: `src/pages/Chat.tsx` (função `sendMessage()`)
**Descrição**: Interface `Message` exige `time: Date`, mas objeto `msg` criado sem esse campo.
```
const msg = {
  id,
  text,
  sender,  // <-- Falta time: new Date()
};
```
**Solução**: Adicionar `time: new Date()` ao objeto `msg`. Padronizar em todos locais (estado inicial, interval, socket).

## 2. **TS2307** - Módulos não encontrados (alias `~` não resolvido)
**Arquivos afetados** (8 ocorrências):
- `src/pages/Chat.tsx:15`: `~/lib/evolution`
- `src/pages/Channels.tsx:4`: `~/modules/channels/evolution/CreateInstanceModal`
- `src/pages/Channels.tsx:5`: `~/modules/channels/evolution/ManageInstanceModal`
- `src/App.tsx:9`: `~/layouts/MainLayout`
- `src/App.tsx:22`: `~/lib/convex`
- `src/layouts/MainLayout.tsx:12`: `~/components/SidebarNav`
- `src/modules/channels/evolution/CreateInstanceModal.tsx:9`: `~/lib/evolution`
- `src/modules/channels/evolution/ManageInstanceModal.tsx:8`: `~/lib/evolution`

**Causa**: Alias `~` definido em `vite.config.ts` mas ausente em `tsconfig.json` (`paths`).
**Solução**:
```
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "~/*": ["src/*"],
    "@/*": ["src/*"]
  }
}
```
Reinicie TS Server (Ctrl+Shift+P > "TypeScript: Restart TS Server").

## 3. **Erros de Sintaxe em Chat.tsx** (Corrupção por tags `<dyad-write>` embutidas)
**Exemplos** (34 problemas reportados):
- **TS1005** (linha 4:19): `',' expected` → `import { useOutlet<dyad-write ...`
- **TS17008** (linha 4:20): `JSX element 'dyad-write' has no corresponding closing tag`
- **TS1382**, **TS17002**: Tokens inesperados `<`, `>`, tags não fechadas.
- **Vite SWC**: `[plugin:vite:react-swc] Expected ',', got '<'`

**Causa**: Tags Dyad não removidas corretamente durante edições, corrompendo o JSX/TSX.
**Solução**: Reescrever arquivo completamente limpo com `<dyad-write>`.

## 4. **Outros Erros Relacionados**
- **TS1192** (`src/App.tsx:11`): No default export em Chat.tsx.
- **Vite Build/Rebuild falhas**: Cache corrompido (`node_modules`, `.vite`), locks EPERM (esbuild.exe no Windows).

## Solução Geral (Passo a Passo)
1. **Limpe caches**: `rm -rf node_modules .vite`, `npm install`.
2. **Corrija tsconfig.app.json** (paths acima).
3. **Reinicie TS Server** + **Rebuild** (`npm run build`).
4. **Convex**: `npx convex dev` para gerar `_generated/`.
5. **Windows extras**: Finalize processos `esbuild.exe`, reinicie PC, exceções antivirus.

**Status**: Todos corrigíveis com reescrita de arquivos + config. Projeto compilável após passos.

*Gerado por Dyad em [data atual]. Última atualização: Correção TS2741 + sintaxe Chat.tsx.*