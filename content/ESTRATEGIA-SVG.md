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
  "localPath": "assets/noto/emoji_u1f34e.svg",
  "license": "Apache-2.0",
  "attribution": "Google Noto Emoji",
  "sense": "manzana, fruta",
  "status": "approved"
}
```

Los recursos se descargarán y guardarán localmente. La aplicación publicada no dependerá de una API externa ni expondrá claves.

## Próximo experimento

Tomar una categoría pequeña —por ejemplo, `Comida y bebida`— y buscar automáticamente una imagen para cada palabra en este orden:

1. Fluent Emoji.
2. Noto Emoji.
3. Iconify con colecciones aprobadas.
4. Revisión manual de las palabras sin coincidencia o con varios significados.

La prueba debe medir cobertura, coincidencias incorrectas, consistencia visual y peso total descargado antes de extenderse al resto de categorías.
