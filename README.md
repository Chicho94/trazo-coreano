# Trazo — práctica de escritura coreana

Aplicación web adaptable a móvil para aprender a escribir vocabulario y gramática de TOPIK I en Hangul.

Abre `dist/index.html` en un navegador. No requiere instalación ni conexión para las lecciones y el teclado. La pronunciación usa las voces de síntesis disponibles en el dispositivo; puede no funcionar si el navegador no ofrece una voz compatible.

Incluye 1.781 palabras de TOPIK I divididas en 75 unidades de hasta 24 palabras. Las seis colecciones temáticas de la primera versión —comida, animales, hogar, naturaleza, lugares y personas— siguen disponibles como acceso rápido. Todo el vocabulario concreto que dispone de pictograma usa archivos locales de Noto Emoji; el resto muestra una referencia visual según el tipo de palabra. También ofrece teclado Hangul en pantalla, soporte para teclado físico con distribución coreana de dos juegos (`tkrhk` → `사과`), composición de bloques silábicos —incluidas consonantes finales dobles—, modo guiado, corrección inmediata, traducción opcional y progreso guardado en este navegador.

El repaso inteligente registra localmente qué palabras necesitaron guía o varios intentos. Al completar una palabra propone una dificultad —difícil, bien o fácil— que se puede corregir manualmente, calcula cuándo conviene repetirla y reúne las palabras pendientes en una sesión de repaso. Es una adaptación ligera del principio de repetición espaciada de Anki, sin cuentas ni envío de datos.

La sección de gramática contiene 67 bloques didácticos distribuidos en 10 niveles, con 126 ejemplos y 203 comprobaciones breves procedentes del proyecto TOPIK.

Trazo es una PWA instalable. El `service-worker.js` guarda la aplicación y el catálogo principal para que puedan abrirse sin conexión después de la primera visita.

En pantallas de teléfono, el teclado aparece como una bandeja inferior al tocar la respuesta. Tiene tecla de mayúsculas para consonantes dobles, barra espaciadora, borrar y «Listo». Se puede ocultar sin perder lo escrito. El progreso de la primera versión se migra automáticamente cuando se abre esta versión.

La versión actual es un MVP de práctica: no incluye cuentas, clases, seguimiento entre dispositivos ni un curso completo de gramática. El progreso se conserva solo en `localStorage`.

## Laboratorio de imágenes

La [comparación visual](dist/comparativa-imagenes.html) permite alternar entre tres palabras y verlas con Noto Emoji, Fluent Emoji 3D y fotografías encontradas en Openverse. Es una prueba independiente: no cambia las ilustraciones de las lecciones. Los archivos de muestra se guardan en `dist/assets/comparativa/` para que la comparación funcione sin consultar servicios externos; la tipografía puede usar Google Fonts si hay conexión.

Noto Emoji se usa bajo Apache 2.0 y Fluent Emoji bajo MIT. Las tres fotos de esta prueba tienen licencia CC BY-NC-SA 2.0: la página muestra sus créditos y enlaces, y esas fotos no se deben trasladar a un producto comercial sin reemplazarlas. Los avisos de licencia de los dos paquetes de emojis están en la carpeta de imágenes.

El sitio se publica con GitHub Pages desde `dist/` mediante el workflow de `.github/workflows/pages.yml`. Cada actualización de la rama `main` vuelve a publicar la versión estática.

## Próximo vocabulario

La [lista de trabajo para TOPIK I](content/README.md) organiza 120 palabras candidatas en cinco lotes para incorporarlas de forma gradual. Se suma a las 48 palabras ya disponibles. La división entre niveles 1 y 2 es editorial y provisional; cada palabra se revisará antes de publicarla en la app.
