import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const defaultTopikRoot = path.resolve(projectRoot, '..', '..', '..', 'TOPIK');
const topikRoot = path.resolve(process.argv[2] || defaultTopikRoot);
const outputRoot = path.join(projectRoot, 'content', 'generated');
const proposalsPath = path.join(projectRoot, 'content', 'topik-i-propuestas.json');

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

const VOCABULARY_CATEGORIES = [
  { id: 'personas', label: 'Personas y relaciones' },
  { id: 'comida', label: 'Comida y bebida' },
  { id: 'hogar', label: 'Hogar y objetos' },
  { id: 'naturaleza', label: 'Naturaleza y clima' },
  { id: 'lugares', label: 'Lugares y ciudad' },
  { id: 'transporte', label: 'Transporte y viajes' },
  { id: 'tiempo', label: 'Tiempo y calendario' },
  { id: 'educacion', label: 'Educación y estudio' },
  { id: 'trabajo', label: 'Trabajo y profesiones' },
  { id: 'salud', label: 'Cuerpo y salud' },
  { id: 'ropa', label: 'Ropa y apariencia' },
  { id: 'cultura', label: 'Cultura y ocio' },
  { id: 'dinero', label: 'Dinero y compras' },
  { id: 'numeros', label: 'Números y cantidades' },
  { id: 'comunicacion', label: 'Comunicación y lenguaje' },
  { id: 'sociedad', label: 'Sociedad y comunidad' },
  { id: 'acciones', label: 'Acciones' },
  { id: 'cualidades', label: 'Cualidades y estados' },
  { id: 'conceptos', label: 'Conceptos y expresiones' }
];

const PROPOSAL_CATEGORY_ALIASES = {
  personas: 'personas', comida: 'comida', casa: 'hogar', naturaleza: 'naturaleza',
  lugares: 'lugares', transporte: 'transporte', tiempo: 'tiempo', estudio: 'educacion',
  actividades: 'cultura', numeros: 'numeros', 'números': 'numeros', colores: 'cualidades',
  acciones: 'acciones', cualidades: 'cualidades'
};

const proposals = fs.existsSync(proposalsPath)
  ? JSON.parse(fs.readFileSync(proposalsPath, 'utf8'))
  : { batches: [] };
const categoryOverrides = new Map(
  proposals.batches.flatMap(batch => batch.words.map(([korean,,category]) => [
    korean,
    PROPOSAL_CATEGORY_ALIASES[category] || 'conceptos'
  ]))
);

const STARTER_CATEGORY_OVERRIDES = {
  사과:'comida', 바나나:'comida', 물:'comida', 우유:'comida', 커피:'comida', 빵:'comida', 밥:'comida', 달걀:'comida',
  고양이:'naturaleza', 개:'naturaleza', 새:'naturaleza', 물고기:'naturaleza', 곰:'naturaleza', 소:'naturaleza', 말:'naturaleza', 돼지:'naturaleza',
  집:'hogar', 책:'educacion', 문:'hogar', 침대:'hogar', 의자:'hogar', 창문:'hogar', 연필:'educacion', 전화:'comunicacion',
  나무:'naturaleza', 꽃:'naturaleza', 해:'naturaleza', 달:'naturaleza', 산:'naturaleza', 바다:'naturaleza', 비:'naturaleza', 눈:'naturaleza',
  엄마:'personas', 아빠:'personas', 아이:'personas', 친구:'personas', 학생:'educacion', 선생님:'educacion', 사람:'personas', 가족:'personas',
  학교:'educacion', 가게:'dinero', 공원:'lugares', 병원:'salud', 버스:'transporte', 지하철:'transporte', 시장:'dinero', 도시:'lugares',
  학생증:'educacion'
};
Object.entries(STARTER_CATEGORY_OVERRIDES).forEach(([word, category]) => categoryOverrides.set(word, category));

const NOUN_CATEGORY_RULES = [
  ['personas', ['persona','hombre','mujer','nino','nina','familia','madre','padre','hermano','hermana','abuelo','abuela','amigo','amiga','esposo','esposa','marido','hijo','hija','bebe','senor','senora','gente','humano','relacion']],
  ['comida', ['comida','alimento','arroz','pan','carne','pescado','fruta','verdura','bebida','agua','leche','cafe','te','jugo','cerveza','vino','desayuno','almuerzo','cena','sopa','huevo','sabor','cocina']],
  ['salud', ['cuerpo','cabeza','cara','rostro','ojo','nariz','boca','diente','mano','brazo','pierna','pie','corazon','sangre','salud','enfermedad','dolor','hospital','medico','medica','medicina','farmacia']],
  ['ropa', ['ropa','camisa','pantalon','falda','vestido','abrigo','zapato','calcetin','sombrero','gafas','apariencia','cabello','pelo']],
  ['transporte', ['autobus','bus','metro','tren','taxi','avion','aeropuerto','bicicleta','coche','carro','vehiculo','barco','viaje','turismo','trafico','estacion','parada']],
  ['tiempo', ['tiempo','hora','dia','semana','mes','ano','fecha','manana','tarde','noche','ayer','hoy','calendario','lunes','martes','miercoles','jueves','viernes','sabado','domingo','primavera','verano','otono','invierno']],
  ['educacion', ['escuela','colegio','universidad','clase','estudiante','profesor','maestro','libro','diccionario','examen','tarea','estudio','educacion','idioma','leccion','pregunta','respuesta']],
  ['trabajo', ['trabajo','empleo','oficina','empresa','profesion','profesional','empleado','jefe','negocio','fabrica','reunion','proyecto']],
  ['dinero', ['dinero','precio','won','banco','mercado','tienda','compra','venta','descuento','tarjeta','cuenta','producto','mercancia']],
  ['hogar', ['casa','hogar','habitacion','sala','puerta','ventana','cama','mesa','silla','mueble','objeto','cosa','bolso','paraguas','reloj','telefono','computadora','ordenador']],
  ['naturaleza', ['naturaleza','animal','perro','gato','caballo','vaca','cerdo','pajaro','arbol','flor','planta','montana','mar','rio','lago','lluvia','nieve','viento','nube','sol','luna','clima','tierra','cielo']],
  ['lugares', ['lugar','sitio','ciudad','pueblo','pais','corea','parque','calle','camino','edificio','restaurante','hotel','biblioteca','cine','iglesia','templo','playa','direccion']],
  ['cultura', ['musica','pelicula','cine','arte','cultura','deporte','ejercicio','juego','foto','fotografia','baile','cancion','fiesta','vacaciones','pasatiempo','television','radio','noticia']],
  ['comunicacion', ['palabra','habla','conversacion','voz','sonido','ruido','carta','correo','mensaje','telefono','lenguaje','idioma','nombre','noticia','informacion']],
  ['sociedad', ['sociedad','gobierno','presidente','politica','ley','policia','economia','historia','mundo','pais','nacion','comunidad','grupo','organizacion']]
];

function normalizeSpanish(value) {
  return String(value || '').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function includesWholeTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^a-z])${escaped}(?:$|[^a-z])`, 'i').test(text);
}

function vocabularyCategory(word) {
  const override = categoryOverrides.get(word.ko);
  if (override) return override;
  if (word.pos === 'nu' || word.pos === 'cnt' || word.numeral) return 'numeros';
  if (word.pos === 'pr') return 'personas';
  if (word.pos === 'v') return 'acciones';
  if (word.pos === 'a') return 'cualidades';
  const meaning = normalizeSpanish(word.es || word.en);
  for (const [category, terms] of NOUN_CATEGORY_RULES) {
    if (terms.some(term => includesWholeTerm(meaning, term))) return category;
  }
  return 'conceptos';
}

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
    irregular: word.irregular || null,
    category: vocabularyCategory(word)
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
const countsByCategory = VOCABULARY_CATEGORIES.map(category => ({
  ...category,
  count: vocabulary.filter(word => word.category === category.id).length
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
    countsByType,
    countsByCategory
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
  `window.TRAZO_CONTENT=${JSON.stringify({ vocabulary, grammar, studyUnits, vocabularyCategories:countsByCategory, inventory })};\n`
);

const typeRows = countsByType.map(group => `| ${group.label} | ${group.count} |`).join('\n');
const categoryRows = countsByCategory.map(group => `| ${group.label} | ${group.count} |`).join('\n');
const markdown = `# Inventario de contenido de Trazo\n\n` +
  `Este inventario se genera automáticamente desde el proyecto TOPIK. Los JSON de \`content/generated/\` no se editan a mano.\n\n` +
  `## Vocabulario\n\n` +
  `- **${inventory.vocabulary.total} palabras únicas** de TOPIK I.\n` +
  `- TOPIK 1: **${inventory.vocabulary.level1}**.\n` +
  `- TOPIK 2: **${inventory.vocabulary.level2}**.\n` +
  `- Con significado disponible: **${inventory.vocabulary.translated}**.\n` +
  `- Ruta propuesta: **${inventory.vocabulary.units} unidades** de hasta 24 palabras.\n\n` +
  `| Tipo | Cantidad |\n|---|---:|\n${typeRows}\n\n` +
  `## Categorías temáticas\n\n| Categoría | Cantidad |\n|---|---:|\n${categoryRows}\n\n` +
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
