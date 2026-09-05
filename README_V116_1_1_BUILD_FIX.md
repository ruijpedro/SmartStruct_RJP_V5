# SmartStruct RJP V116.1.1 — BUILD FIX

Correção estrutural do build observada no GitHub Actions da V116.1 RC.

- Estrutura de módulos normalizada para `src/<modulo>/`, em conformidade com os caminhos reportados pelo TypeScript no runner.
- Imports internos corrigidos de `../../engineering|app|ui` para `../engineering|app|ui`.
- Imports do `src/app/App.tsx` corrigidos para a estrutura normalizada.
- `PlanningBudgetPage` incluído e referenciado em `src/planningBudget/PlanningBudgetPage.tsx`.
- Funcionalidades V116.1 mantidas; alteração focada no build.
