# SmartStruct RJP V114.0.1 — Build Fix

Correção do workflow TypeScript para ambientes GitHub onde `tsconfig.app.json` não é incluído no checkout.

- `build`: `tsc -p tsconfig.json && vite build`
- `typecheck`: `tsc -p tsconfig.json --noEmit`
- `build:web`: `tsc -p tsconfig.json && vite build`
- Mantém a V114: Biblioteca BIM multidisciplinar, opções Vivenda/Prédio e sapatas centradas nos eixos dos pilares com excentricidades explícitas.
