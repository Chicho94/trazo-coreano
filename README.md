# Trazo — práctica de escritura coreana

Prototipo web adaptable a móvil para aprender a escribir vocabulario básico en Hangul.

Abre `dist/index.html` en un navegador. No requiere instalación ni conexión para las lecciones y el teclado. La pronunciación usa las voces de síntesis disponibles en el dispositivo; puede no funcionar si el navegador no ofrece una voz compatible.

Incluye 48 palabras en seis temas (comida y bebida, animales, casa y objetos, naturaleza, personas y lugares). Las nueve ilustraciones originales son SVG integrados y el vocabulario nuevo utiliza pictogramas del sistema. También ofrece teclado Hangul en pantalla, soporte para teclado físico con distribución coreana de dos juegos (`tkrhk` → `사과`), composición de bloques silábicos, modo guiado que destaca la siguiente letra, corrección inmediata, traducción opcional y progreso guardado en este navegador.

En pantallas de teléfono, el teclado aparece como una bandeja inferior al tocar la respuesta. Tiene tecla de mayúsculas para consonantes dobles, barra espaciadora, borrar y «Listo». Se puede ocultar sin perder lo escrito. El progreso de la primera versión se migra automáticamente cuando se abre esta versión.

La versión actual es un MVP de práctica: no incluye cuentas, clases, seguimiento entre dispositivos ni un curso completo de gramática. El progreso se conserva solo en `localStorage`.

El sitio se publica con GitHub Pages desde `dist/` mediante el workflow de `.github/workflows/pages.yml`. Cada actualización de la rama `main` vuelve a publicar la versión estática.

## Próximo vocabulario

La [lista de trabajo para TOPIK I](content/README.md) organiza 120 palabras candidatas en cinco lotes para incorporarlas de forma gradual. Se suma a las 48 palabras ya disponibles. La división entre niveles 1 y 2 es editorial y provisional; cada palabra se revisará antes de publicarla en la app.
