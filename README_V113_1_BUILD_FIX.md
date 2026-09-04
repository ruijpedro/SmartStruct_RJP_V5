# SmartStruct RJP V113.0.1 — Build Fix

Correção do pipeline TypeScript no GitHub Actions.

- O comando de build passa a indicar explicitamente `tsconfig.app.json`.
- Incluído `tsconfig.app.json` com a configuração TypeScript da aplicação.
- Evita que `tsc` seja executado sem projeto e apresente apenas a página de ajuda.
- Versão atualizada para 113.0.1.

Build esperado: `tsc -p tsconfig.app.json && vite build`.
