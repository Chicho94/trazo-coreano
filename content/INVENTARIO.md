# Inventario de contenido de Trazo

Este inventario se genera automáticamente desde el proyecto TOPIK. Los JSON de `content/generated/` no se editan a mano.

## Vocabulario

- **1781 palabras únicas** de TOPIK I.
- TOPIK 1: **713**.
- TOPIK 2: **1068**.
- Con significado disponible: **1781**.
- Ruta propuesta: **75 unidades** de hasta 24 palabras.

| Tipo | Cantidad |
|---|---:|
| Sustantivos | 1105 |
| Verbos | 271 |
| Adjetivos | 137 |
| Adverbios | 119 |
| Pronombres | 33 |
| Determinantes | 23 |
| Números | 46 |
| Contadores | 33 |
| Expresiones | 14 |

## Gramática

- **67 bloques didácticos** distribuidos en 10 niveles.
- **126 ejemplos** listos para usar.
- **203 comprobaciones breves** listas para practicar.

## Archivos generados

- `topik-i-vocabulary.json`: todas las palabras que puede consumir Trazo.
- `topik-i-grammar.json`: todos los bloques de gramática preparados.
- `study-units.json`: división progresiva en grupos manejables.
- `inventory.json`: métricas para validación automática.

## Regeneración

Desde la raíz de Trazo:

```powershell
node scripts/build-content.mjs
```

Opcionalmente se puede pasar otra ruta al proyecto TOPIK como primer argumento.
