import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const defaultTopikRoot = path.resolve(projectRoot, '..', '..', '..', 'TOPIK');
const topikRoot = path.resolve(process.argv[2] || defaultTopikRoot);
const outputRoot = path.join(projectRoot, 'content', 'generated');

const vocabularyPath = path.join(topikRoot, 'datos', 'vocabulario.json');
const levelsPath = path.join(topikRoot, 'estudio', 'niveles.js');

for (const source of [vocabularyPath, levelsPath]) {
  if (!fs.existsSync(source)) {
    throw new Error(`No se encontró la fuente TOPIK: ${source}`);
  }
}

const POS_LABELS = {
  n: 'Sustantivos',
  v: 'Verbos',
  a: 'Adjetivos',
  ad: 'Adverbios',
  pr: 'Pronombres',
  det: 'Determinantes',
  nu: 'Números',
  cnt: 'Contadores',
  ex: 'Expresiones'
};

const rawVocabulary = JSON.parse(fs.readFileSync(vocabularyPath, 'utf8'));
const vocabulary = rawVocabulary
  .filter(word => word.lv === 1 || word.lv === 2)
  .map(word => ({
    korean: word.ko,
    writing: word.ko.replace(/^-/, ''),
    spanish: word.es || word.en || '',
    level: word.lv,
    type: word.pos || 'other',
    typeLabel: POS_LABELS[word.pos] || 'Otras palabras',
    frequency: Number.isFinite(word.f) ? word.f : null,
    courseLevels: Array.isArray(word.niveles) ? word.niveles : [],
    numeral: word.numeral || null,
    irregular: word.irregular || null
  }))
  .sort((a, b) => a.level - b.level
    || (a.frequency ?? Number.MAX_SAFE_INTEGER) - (b.frequency ?? Number.MAX_SAFE_INTEGER)
    || a.korean.localeCompare(b.korean, 'ko'));

const studyUnits = [];
for (const level of [1, 2]) {
  const levelWords = vocabulary.filter(word => word.level === level);
  for (let offset = 0; offset < levelWords.length; offset += 24) {
    const sequence = Math.floor(offset / 24) + 1;
    const id = `topik-${level}-${String(sequence).padStart(2, '0')}`;
    const words = levelWords.slice(offset, offset + 24).map(word => word.korean);
    studyUnits.push({
      id,
      level,
      sequence,
      title: `TOPIK ${level} · Unidad ${String(sequence).padStart(2, '0')}`,
      wordCount: words.length,
      words
    });
  }
}

const unitByWord = new Map(studyUnits.flatMap(unit => unit.words.map(word => [word, unit.id])));
for (const word of vocabulary) word.unit = unitByWord.get(word.korean);

const context = { window: {}, console: { warn() {}, log() {}, error() {} } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(levelsPath, 'utf8'), context, { filename: levelsPath });
const levels = context.window.NIVELES || [];
const grammar = levels.flatMap(level => level.gramatica.map((lesson, index) => ({
  id: `grammar-${level.n}-${String(index + 1).padStart(2, '0')}`,
  courseLevel: level.n,
  courseTitle: level.titulo,
  theme: level.tema,
  sequence: index + 1,
  title: lesson.t,
  summary: lesson.d,
  simpleExplanation: lesson.nino || '',
  examples: Array.isArray(lesson.ej)
    ? lesson.ej.map(example => ({ korean: example.ko, spanish: example.es }))
    : [],
  checks: Array.isArray(lesson.check)
    ? lesson.check.map(check => ({ question: check.q, answer: check.a }))
    : []
})));

const countsByType = Object.entries(POS_LABELS).map(([type, label]) => ({
  type,
  label,
  count: vocabulary.filter(word => word.type === type).length
})).filter(group => group.count > 0);

const inventory = {
  generatedAt: new Date().toISOString(),
  source: {
    project: 'TOPIK',
    vocabulary: 'datos/vocabulario.json',
    grammar: 'estudio/niveles.js'
  },
  vocabulary: {
    total: vocabulary.length,
    level1: vocabulary.filter(word => word.level === 1).length,
    level2: vocabulary.filter(word => word.level === 2).length,
    translated: vocabulary.filter(word => word.spanish).length,
    units: studyUnits.length,
    countsByType
  },
  grammar: {
    lessonBlocks: grammar.length,
    courseLevels: levels.length,
    examples: grammar.reduce((total, lesson) => total + lesson.examples.length, 0),
    checks: grammar.reduce((total, lesson) => total + lesson.checks.length, 0)
  }
};

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, 'topik-i-vocabulary.json'), `${JSON.stringify(vocabulary, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'topik-i-grammar.json'), `${JSON.stringify(grammar, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'study-units.json'), `${JSON.stringify(studyUnits, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'inventory.json'), `${JSON.stringify(inventory, null, 2)}\n`);
const publicDataRoot = path.join(projectRoot, 'dist', 'data');
fs.mkdirSync(publicDataRoot, { recursive: true });
fs.writeFileSync(
  path.join(publicDataRoot, 'topik-content.js'),
  `window.TRAZO_CONTENT=${JSON.stringify({ vocabulary, grammar, studyUnits, inventory })};\n`
);

const typeRows = countsByType.map(group => `| ${group.label} | ${group.count} |`).join('\n');
const markdown = `# Inventario de contenido de Trazo\n\n` +
  `Este inventario se genera automáticamente desde el proyecto TOPIK. Los JSON de \`content/generated/\` no se editan a mano.\n\n` +
  `## Vocabulario\n\n` +
  `- **${inventory.vocabulary.total} palabras únicas** de TOPIK I.\n` +
  `- TOPIK 1: **${inventory.vocabulary.level1}**.\n` +
  `- TOPIK 2: **${inventory.vocabulary.level2}**.\n` +
  `- Con significado disponible: **${inventory.vocabulary.translated}**.\n` +
  `- Ruta propuesta: **${inventory.vocabulary.units} unidades** de hasta 24 palabras.\n\n` +
  `| Tipo | Cantidad |\n|---|---:|\n${typeRows}\n\n` +
  `## Gramática\n\n` +
  `- **${inventory.grammar.lessonBlocks} bloques didácticos** distribuidos en ${inventory.grammar.courseLevels} niveles.\n` +
  `- **${inventory.grammar.examples} ejemplos** listos para usar.\n` +
  `- **${inventory.grammar.checks} comprobaciones breves** listas para practicar.\n\n` +
  `## Archivos generados\n\n` +
  `- \`topik-i-vocabulary.json\`: todas las palabras que puede consumir Trazo.\n` +
  `- \`topik-i-grammar.json\`: todos los bloques de gramática preparados.\n` +
  `- \`study-units.json\`: división progresiva en grupos manejables.\n` +
  `- \`inventory.json\`: métricas para validación automática.\n\n` +
  `## Regeneración\n\n` +
  `Desde la raíz de Trazo:\n\n` +
  '```powershell\nnode scripts/build-content.mjs\n```\n\n' +
  `Opcionalmente se puede pasar otra ruta al proyecto TOPIK como primer argumento.\n`;

fs.writeFileSync(path.join(projectRoot, 'content', 'INVENTARIO.md'), markdown);
console.log(JSON.stringify(inventory, null, 2));
