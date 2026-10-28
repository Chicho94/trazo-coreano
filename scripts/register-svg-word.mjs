import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const [word, assetPath, label, emoji, provider = 'noto-emoji'] = process.argv.slice(2);

if (!word || !assetPath || !label || !emoji) {
  console.error('Uso: node scripts/register-svg-word.mjs <palabra> <ruta> <etiqueta> <emoji> [proveedor]');
  process.exit(1);
}

const root = process.cwd();
const manifestPath = path.join(root, 'dist', 'data', 'svg-vocabulary.js');
const trackerPath = path.join(root, 'content', 'ESTADO-SVG.md');
const absoluteAssetPath = path.join(root, 'dist', assetPath);

if (!fs.existsSync(absoluteAssetPath)) {
  console.error(`No existe el SVG: ${absoluteAssetPath}`);
  process.exit(1);
}

const svg = fs.readFileSync(absoluteAssetPath, 'utf8');
if (!/<svg[\s>]/i.test(svg)) {
  console.error(`El archivo no contiene un SVG válido: ${absoluteAssetPath}`);
  process.exit(1);
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(manifestPath, 'utf8'), context);
const manifest = context.window.TRAZO_SVG_VISUALS;
manifest[word] = { path: assetPath.replaceAll('\\', '/'), label, emoji, provider };

let tracker = fs.readFileSync(trackerPath, 'utf8');
const rowPattern = new RegExp(`^\\| ${word.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')} \\| (?:NO_TIENE|EN_PROCESO|ESTA_HECHO) \\|$`, 'm');
if (!rowPattern.test(tracker)) {
  console.error(`No se encontró la palabra en el inventario: ${word}`);
  process.exit(1);
}
tracker = tracker.replace(rowPattern, `| ${word} | ESTA_HECHO |`);

fs.writeFileSync(manifestPath, `window.TRAZO_SVG_VISUALS=${JSON.stringify(manifest, null, 2)};\n`);
fs.writeFileSync(trackerPath, tracker);
console.log(`Registrado: ${word} → ${assetPath}`);
