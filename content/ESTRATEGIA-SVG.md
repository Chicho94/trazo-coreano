# Estrategia SVG para Trazo Coreano

## Decisión

SVG sí vale la pena, pero no como una fábrica automática de ilustraciones. Una biblioteca de dibujo reduce el código necesario para trazar formas; no sabe cómo representar correctamente 1.781 conceptos.

La estrategia será híbrida:

1. Buscar primero un recurso existente en Fluent Emoji o Noto Emoji.
2. Ampliar la búsqueda con Iconify, limitando las colecciones a licencias previamente aprobadas.
3. Crear SVG propios únicamente para diagramas reutilizables, gramática y conceptos que se puedan construir con un sistema de piezas.
4. Usar fotografías o pictogramas externos como último recurso y guardar siempre su atribución.

## Bibliotecas evaluadas

### Iconify — recomendada para la siguiente prueba

- Más de 300.000 iconos procedentes de más de 200 colecciones.
- API de búsqueda y descarga directa en SVG.
- No requiere agregar una dependencia al navegador si descargamos los recursos durante la construcción.
- La licencia pertenece a cada colección; se debe guardar junto al recurso.
- Documentación: https://iconify.design/docs/api/

### SVG.js — útil más adelante

- Biblioteca pequeña, sin dependencias, para crear, manipular y animar SVG.
- Adecuada para diagramas de gramática, bloques Hangul y escenas construidas con componentes.
- No amplía el catálogo de objetos por sí misma.
- Documentación: https://svgjs.dev/docs/3.2/

### Paper.js — no necesaria por ahora

- Muy potente para curvas, geometría y edición vectorial compleja.
- Trabaja principalmente sobre Canvas y luego puede exportar SVG.
- Es más de lo necesario para las tarjetas de vocabulario actuales.
- Documentación: https://paperjs.org/about/

### Rough.js — descartada para la identidad principal

- Genera líneas con apariencia dibujada a mano sobre Canvas o SVG.
- Su estilo no coincide con las ilustraciones limpias de Fluent y Noto.
- Podría servir para una actividad puntual, pero fragmentaría el lenguaje visual de la aplicación.
- Repositorio: https://github.com/rough-stuff/rough

## Datos que debe guardar cada imagen

```json
{
  "word": "사과",
  "provider": "noto-emoji",
  "assetId": "emoji_u1f34e",
  "localPath": "assets/svg/noto/emoji_u1f34e.svg",
  "license": "Apache-2.0",
  "attribution": "Google Noto Emoji",
  "sense": "manzana, fruta",
  "status": "approved"
}
```

Los recursos se descargarán y guardarán localmente. La aplicación publicada no dependerá de una API externa ni expondrá claves.

## Control de avance obligatorio

El archivo `ESTADO-SVG.md` es la fuente de verdad para el avance de las ilustraciones. Contiene una fila por cada palabra del vocabulario y solo admite estos estados:

- `NO_TIENE`: todavía no se ha iniciado el SVG.
- `EN_PROCESO`: el SVG está siendo investigado, diseñado o implementado.
- `ESTA_HECHO`: el SVG está terminado, integrado y verificado.

El trabajo se realiza palabra por palabra:

1. Crear, descargar o seleccionar un SVG semánticamente útil.
2. Registrar inmediatamente la asociación en el manifiesto.
3. Actualizar esa palabra a `ESTA_HECHO` en `ESTADO-SVG.md`.
4. Repetir el ciclo.

La herramienta `scripts/register-svg-word.mjs` comprueba que el archivo exista y contenga un SVG antes de actualizar el manifiesto y el inventario. Si una palabra queda interrumpida antes de completar el registro, debe permanecer como `EN_PROCESO`.

Los lotes de trabajo contienen 50 palabras. Al completar cada lote se debe actualizar la versión de caché, validar el inventario y todos los archivos, crear un único commit y publicarlo. Las comprobaciones intermedias pueden ejecutarse durante el lote, pero no generan commits ni publicaciones adicionales.

## Próximo experimento

Tomar una categoría pequeña —por ejemplo, `Comida y bebida`— y buscar automáticamente una imagen para cada palabra en este orden:

1. Fluent Emoji.
2. Noto Emoji.
3. Iconify con colecciones aprobadas.
4. Revisión manual de las palabras sin coincidencia o con varios significados.

La prueba debe medir cobertura, coincidencias incorrectas, consistencia visual y peso total descargado antes de extenderse al resto de categorías.
