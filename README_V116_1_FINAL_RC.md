# SmartStruct RJP V116.1.0 — Release Candidate

Versão de fecho funcional da aplicação. Não acrescenta novos módulos; consolida a V116 para utilização e testes finais.

## Ajustes de fecho
- Removido ficheiro temporário `RehabilitationPage.tsx.tmp`.
- Versão consolidada para `116.1.0`.
- Workflows Web/Android com nomes de artefactos atualizados para V116.1.
- Mantidos BIM/editor 3D, planeamento/orçamento, IFC/openBIM e todos os módulos de engenharia da V116.
- Mantida a distinção entre pré-dimensionamento/estudo prévio e verificação final de projeto.

## Checklist de aceitação antes de declarar FINAL
1. `npm run typecheck` sem erros.
2. `npm run build` sem erros.
3. GitHub Actions WebApp verde.
4. GitHub Actions Android/APK verde.
5. Abrir, guardar e reabrir projeto.
6. Criar Vivenda e Prédio, editar BIM e confirmar persistência.
7. Importar/exportar IFC e verificar propriedades.
8. Testar cálculo estrutural, geotecnia, hidráulica e vias com um caso simples.
9. Gerar relatório/PDF e mapa de quantidades.
10. Testar layout em desktop, tablet e telemóvel.

Após estes testes, a recomendação é congelar funcionalidades e tratar apenas correções de bugs.
