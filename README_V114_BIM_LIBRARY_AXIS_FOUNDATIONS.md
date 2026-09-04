# SmartStruct RJP V114 — BIM Multidisciplinar + Sapatas ao eixo

## BIM
- Biblioteca alargada com alvenarias, unidades de alvenaria, portas, janelas, mobiliário, torneiras e equipamentos sanitários.
- Novos filtros BIM para arquitetura/alvenaria, mobiliário e equipamentos sanitários.
- Exportação IFC mantém os novos objetos através de IfcBuildingElementProxy quando não existe ainda uma classe IFC especializada no exportador leve.

## Modelo de edifício
- Novo seletor **Vivenda · até 3 pisos** / **Prédio**.
- Vivenda limita automaticamente o modelo paramétrico a 3 pisos.

## Sapatas e pilares
- Nos modelos automáticos, cada sapata isolada é agora centrada no mesmo eixo X/Y do respetivo pilar.
- O BIM guarda `axisX`, `axisY`, `columnOffsetX` e `columnOffsetY` para rastreabilidade geométrica.
- Fundações PRO ganhou desvios de eixo X/Y entre pilar e sapata.
- Quando existe desvio, o solver inclui automaticamente os momentos adicionais `NEd × e` antes de calcular excentricidades, pressões de contacto e estabilidade.
- A representação em planta mostra os eixos da sapata e a posição real do pilar.
