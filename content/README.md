# Contenido de TOPIK I para Trazo

La fuente maestra está en el proyecto hermano `TOPIK`. Ejecuta `node scripts/build-content.mjs` para regenerar el inventario completo y los archivos de `content/generated/`.

- [`INVENTARIO.md`](INVENTARIO.md) resume las cantidades actuales.
- `generated/topik-i-vocabulary.json` contiene el vocabulario completo.
- `generated/topik-i-grammar.json` contiene los bloques didácticos de gramática.
- `generated/study-units.json` divide el vocabulario en unidades pequeñas.

Los archivos generados no se editan manualmente. La lista siguiente queda como registro histórico de la primera ampliación editorial del prototipo.

## Propuesta inicial de 120 palabras

Esta es una lista de trabajo para ampliar Trazo de forma gradual. TOPIK I comprende los niveles 1 y 2, pero las columnas de nivel de esta lista son **una propuesta editorial**, no una clasificación oficial palabra por palabra. El Diccionario Básico Coreano del Instituto Nacional de la Lengua Coreana distingue vocabulario elemental, intermedio y avanzado; se usará para verificar la escritura y el significado antes de publicar cada lote.

- Las 48 palabras que ya están en `dist/app.js` se consideran **publicadas**. No se duplican en `topik-i-propuestas.json`.
- Las 120 propuestas se organizan en cinco lotes de 24 palabras. Los lotes 1 a 3 priorizan el nivel 1; los lotes 4 y 5 amplían hacia el nivel 2.
- Antes de integrar una palabra: verificar su acepción en contexto, elegir una imagen clara, comprobar la composición Hangul con el teclado y probarla en móvil.
- La imagen base de una palabra se toma de Noto Emoji y se guarda localmente. El nombre se deriva de sus puntos Unicode, lo que permite ampliar el catálogo sin mantener una tabla manual de rutas.
- Fluent Emoji queda disponible para palabras destacadas o casos donde aporte una representación más clara. Mezclar estilos debe ser una decisión editorial, no aleatoria.
- Si ninguna biblioteca representa bien el sentido elegido, se crea una ilustración propia. Las fotografías requieren revisar su licencia y atribución individualmente.
- Las lecciones de gramática se explican con estructura visual, ejemplos y textos simples. No necesitan una ilustración literal para cada regla.
- `읽다`, `많다` y `여덟` requieren ampliar la composición de consonantes finales dobles del teclado antes de publicarse en la app.
- Una palabra puede tener varios sentidos. El significado español aquí es el sentido que se pretende ilustrar en Trazo (por ejemplo, `차` como bebida).

Referencia de consulta: [Diccionario Básico Coreano](https://krdict.korean.go.kr/) y su [buscador por nivel](https://krdict.korean.go.kr/kor/dicSearchDetail/searchDetailWords).
