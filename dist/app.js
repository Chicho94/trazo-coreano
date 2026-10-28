const starterCategories = [
  { id:'comida', name:'Comida y bebida', icon:'🍽️', tone:'#fff1f2' },
  { id:'animales', name:'Animales', icon:'🐾', tone:'#eef4ff' },
  { id:'casa', name:'Casa y objetos', icon:'🏠', tone:'#f7f7f9' },
  { id:'naturaleza', name:'Naturaleza', icon:'🌿', tone:'#edf3ff' },
  { id:'personas', name:'Personas', icon:'👋', tone:'#fff0f2' },
  { id:'lugares', name:'Lugares', icon:'📍', tone:'#eff5ff' }
];
const starterWords = [
  { category:'comida', korean:'사과', spanish:'manzana', image:'apple', emoji:'🍎', imageLabel:'una manzana roja' },
  { category:'comida', korean:'바나나', spanish:'banana', image:'banana', emoji:'🍌', imageLabel:'una banana' },
  { category:'comida', korean:'물', spanish:'agua', image:'water', emoji:'💧', imageLabel:'un vaso con agua' },
  { category:'comida', korean:'우유', spanish:'leche', image:'milk', emoji:'🥛', imageLabel:'un cartón de leche' },
  { category:'comida', korean:'커피', spanish:'café', image:'coffee', emoji:'☕', imageLabel:'una taza de café' },
  { category:'comida', korean:'빵', spanish:'pan', emoji:'🍞' },
  { category:'comida', korean:'밥', spanish:'arroz cocido', emoji:'🍚' },
  { category:'comida', korean:'달걀', spanish:'huevo', emoji:'🥚' },
  { category:'animales', korean:'고양이', spanish:'gato', image:'cat', emoji:'🐱', imageLabel:'un gato' },
  { category:'animales', korean:'개', spanish:'perro', emoji:'🐶' },
  { category:'animales', korean:'새', spanish:'pájaro', emoji:'🐦' },
  { category:'animales', korean:'물고기', spanish:'pez', emoji:'🐟' },
  { category:'animales', korean:'곰', spanish:'oso', emoji:'🐻' },
  { category:'animales', korean:'소', spanish:'vaca', emoji:'🐮' },
  { category:'animales', korean:'말', spanish:'caballo', emoji:'🐴' },
  { category:'animales', korean:'돼지', spanish:'cerdo', emoji:'🐷' },
  { category:'casa', korean:'집', spanish:'casa', image:'house', emoji:'🏠', imageLabel:'una casa' },
  { category:'casa', korean:'책', spanish:'libro', image:'book', emoji:'📖', imageLabel:'un libro abierto' },
  { category:'casa', korean:'문', spanish:'puerta', emoji:'🚪' },
  { category:'casa', korean:'침대', spanish:'cama', emoji:'🛏️' },
  { category:'casa', korean:'의자', spanish:'silla', emoji:'🪑' },
  { category:'casa', korean:'창문', spanish:'ventana', emoji:'🪟' },
  { category:'casa', korean:'연필', spanish:'lápiz', emoji:'✏️' },
  { category:'casa', korean:'전화', spanish:'teléfono', emoji:'☎️' },
  { category:'naturaleza', korean:'나무', spanish:'árbol', image:'tree', emoji:'🌳', imageLabel:'un árbol' },
  { category:'naturaleza', korean:'꽃', spanish:'flor', emoji:'🌸' },
  { category:'naturaleza', korean:'해', spanish:'sol', emoji:'☀️' },
  { category:'naturaleza', korean:'달', spanish:'luna', emoji:'🌙' },
  { category:'naturaleza', korean:'산', spanish:'montaña', emoji:'⛰️' },
  { category:'naturaleza', korean:'바다', spanish:'mar', emoji:'🌊' },
  { category:'naturaleza', korean:'비', spanish:'lluvia', emoji:'🌧️' },
  { category:'naturaleza', korean:'눈', spanish:'nieve', emoji:'❄️' },
  { category:'personas', korean:'엄마', spanish:'mamá', emoji:'👩' },
  { category:'personas', korean:'아빠', spanish:'papá', emoji:'👨' },
  { category:'personas', korean:'아이', spanish:'niño o niña', emoji:'🧒' },
  { category:'personas', korean:'친구', spanish:'amigo o amiga', emoji:'🧑‍🤝‍🧑' },
  { category:'personas', korean:'학생', spanish:'estudiante', emoji:'🧑‍🎓' },
  { category:'personas', korean:'선생님', spanish:'profesor o profesora', emoji:'🧑‍🏫' },
  { category:'personas', korean:'사람', spanish:'persona', emoji:'🧍' },
  { category:'personas', korean:'가족', spanish:'familia', emoji:'👨‍👩‍👧‍👦' },
  { category:'lugares', korean:'학교', spanish:'escuela', emoji:'🏫' },
  { category:'lugares', korean:'가게', spanish:'tienda', emoji:'🏪' },
  { category:'lugares', korean:'공원', spanish:'parque', emoji:'🏞️' },
  { category:'lugares', korean:'병원', spanish:'hospital', emoji:'🏥' },
  { category:'lugares', korean:'버스', spanish:'autobús', emoji:'🚌' },
  { category:'lugares', korean:'지하철', spanish:'metro', emoji:'🚇' },
  { category:'lugares', korean:'시장', spanish:'mercado', emoji:'🏬' },
  { category:'lugares', korean:'도시', spanish:'ciudad', emoji:'🏙️' }
];

const categories = [
  { id:'topik1', name:'TOPIK 1', icon:'한', tone:'#fff1f2' },
  { id:'topik2', name:'TOPIK 2', icon:'둘', tone:'#eef4ff' }
];
const vocabularyCategories = window.TRAZO_CONTENT?.vocabularyCategories || starterCategories.map(category => ({
  id:category.id === 'casa' ? 'hogar' : category.id,
  label:category.name,
  count:starterWords.filter(word => word.category === category.id).length
}));
const starterVisuals = Object.fromEntries(starterWords.map(word => [word.korean,word]));
const masterVocabulary = window.TRAZO_CONTENT?.vocabulary || starterWords.map((word,index) => ({ ...word, level:1, type:'n', unit:'topik-1-01', frequency:index + 1 }));
const words = masterVocabulary.map(word => {
  const visual = starterVisuals[word.korean] || {};
  return {
    ...word,
    spanish:visual.spanish || word.spanish,
    fullSpanish:word.spanish,
    vocabularyCategory:word.category || (visual.category === 'casa' ? 'hogar' : visual.category) || 'conceptos',
    category:`topik${word.level || 1}`,
    collection:visual.category || null,
    emoji:visual.emoji || '',
    hasVisual:Boolean(visual.emoji),
    image:visual.image,
    imageLabel:visual.imageLabel || word.spanish
  };
});
const studyUnits = window.TRAZO_CONTENT?.studyUnits || [{ id:'topik-1-01', level:1, sequence:1, title:'TOPIK 1 · Unidad 01', wordCount:words.length, words:words.map(word => word.korean) }];
let currentUnit = words[0]?.unit || studyUnits[0]?.id;

const INITIAL = [...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'];
const MEDIAL = [...'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'];
const FINAL = [...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];
const CONSONANTS = new Set(INITIAL);
const VOWELS = new Set(MEDIAL);
const VOWEL_INPUT = { 'ㅘ':['ㅗ','ㅏ'], 'ㅙ':['ㅗ','ㅐ'], 'ㅚ':['ㅗ','ㅣ'], 'ㅝ':['ㅜ','ㅓ'], 'ㅞ':['ㅜ','ㅔ'], 'ㅟ':['ㅜ','ㅣ'], 'ㅢ':['ㅡ','ㅣ'] };
const VOWEL_COMBINATIONS = Object.fromEntries(Object.entries(VOWEL_INPUT).map(([combined, parts]) => [parts.join(''), combined]));
const FINAL_INPUT = { 'ㄳ':['ㄱ','ㅅ'], 'ㄵ':['ㄴ','ㅈ'], 'ㄶ':['ㄴ','ㅎ'], 'ㄺ':['ㄹ','ㄱ'], 'ㄻ':['ㄹ','ㅁ'], 'ㄼ':['ㄹ','ㅂ'], 'ㄽ':['ㄹ','ㅅ'], 'ㄾ':['ㄹ','ㅌ'], 'ㄿ':['ㄹ','ㅍ'], 'ㅀ':['ㄹ','ㅎ'], 'ㅄ':['ㅂ','ㅅ'] };
const FINAL_COMBINATIONS = Object.fromEntries(Object.entries(FINAL_INPUT).map(([combined,parts]) => [parts.join(''),combined]));
const KEY_ROWS = [
  [['ㅂ','q'],['ㅈ','w'],['ㄷ','e'],['ㄱ','r'],['ㅅ','t'],['ㅛ','y'],['ㅕ','u'],['ㅑ','i'],['ㅐ','o'],['ㅔ','p']],
  [['ㅁ','a'],['ㄴ','s'],['ㅇ','d'],['ㄹ','f'],['ㅎ','g'],['ㅗ','h'],['ㅓ','j'],['ㅏ','k'],['ㅣ','l']],
  [['ㅋ','z'],['ㅌ','x'],['ㅊ','c'],['ㅍ','v'],['ㅠ','b'],['ㅜ','n'],['ㅡ','m']]
];
const LATIN_KEY = Object.fromEntries(KEY_ROWS.flat().map(([jamo,key]) => [key,jamo]));
const SHIFT_KEY = { q:'ㅃ', w:'ㅉ', e:'ㄸ', r:'ㄲ', t:'ㅆ', o:'ㅒ', p:'ㅖ' };
const $ = selector => document.querySelector(selector);
const writingFor = word => word.writing || word.korean;
const starterGrammarLessons = {
  topic:{ step:'LECCIÓN 01 / PARTÍCULAS', title:'Presenta el <em>tema</em> de la oración.', intro:'은 y 는 nos dicen de qué persona o cosa vamos a hablar.', subject:'저', subjectMeaning:'yo', particle:'는', particleMeaning:'marca el tema', rest:'학생이에요', restMeaning:'soy estudiante', ruleTitle:'¿은 o 는?', rule:'Usa 는 después de una vocal y 은 después de una consonante: 저는, 책은.', text:'안녕하세요. 저는 마리아예요. 저는 학생이에요.', translation:'Hola. Soy María. Soy estudiante.' },
  subject:{ step:'LECCIÓN 02 / PARTÍCULAS', title:'Señala quién realiza o vive la <em>acción</em>.', intro:'이 y 가 destacan el sujeto de la oración o presentan información nueva.', subject:'비', subjectMeaning:'lluvia', particle:'가', particleMeaning:'marca el sujeto', rest:'와요', restMeaning:'viene / llueve', ruleTitle:'¿이 o 가?', rule:'Usa 가 después de una vocal y 이 después de una consonante: 비가, 사람이.', text:'오늘은 비가 와요. 우산이 있어요.', translation:'Hoy llueve. Tengo un paraguas.' },
  object:{ step:'LECCIÓN 03 / PARTÍCULAS', title:'Marca aquello que recibe la <em>acción</em>.', intro:'을 y 를 acompañan al objeto sobre el que actúa el verbo.', subject:'사과', subjectMeaning:'manzana', particle:'를', particleMeaning:'marca el objeto', rest:'먹어요', restMeaning:'como', ruleTitle:'¿을 o 를?', rule:'Usa 를 después de una vocal y 을 después de una consonante: 사과를, 빵을.', text:'저는 사과를 먹어요. 물을 마셔요.', translation:'Como una manzana. Bebo agua.' }
};
const grammarLessons = window.TRAZO_CONTENT?.grammar || Object.entries(starterGrammarLessons).map(([id,lesson],index) => ({
  id,
  courseLevel:1,
  courseTitle:'Fundamentos',
  theme:'Partículas',
  sequence:index + 1,
  title:lesson.ruleTitle,
  summary:lesson.rule,
  simpleExplanation:lesson.intro,
  examples:[{ korean:`${lesson.subject}${lesson.particle} ${lesson.rest}`, spanish:`${lesson.subjectMeaning}; ${lesson.particleMeaning}; ${lesson.restMeaning}` }],
  checks:[]
}));
let currentGrammarId = grammarLessons[0]?.id;
let currentIndex = 0;
let inputTokens = [];
let completed = new Set();
let reviewState = {};
let reviewQueue = [];
let currentCollection = null;
let currentVocabularyCategory = 'all';
let guided = false;
let successShown = false;
let shiftActive = false;
let mistakeCount = 0;
let guidedUsed = false;
let lastReviewBaseline = null;
const DAY = 24 * 60 * 60 * 1000;
const mobileViewport = matchMedia('(max-width: 760px)');

function loadProgress() {
  try {
    const current = localStorage.getItem('trazo-coreano-v2');
    const saved = JSON.parse(current || localStorage.getItem('trazo-coreano-v1') || '{}');
    const previousWords = ['사과','물','집','책','나무','고양이','커피','우유','바나나'];
    const knownWords = new Set(words.map(word => word.korean));
    completed = new Set(Array.isArray(saved.completed) ? saved.completed.map(item => typeof item === 'number' ? previousWords[item] : item).filter(item => knownWords.has(item)) : []);
    reviewState = saved.review && typeof saved.review === 'object' ? saved.review : {};
    guided = saved.guided === true;
  } catch { completed = new Set(); reviewState = {}; }
}
function saveProgress() {
  try { localStorage.setItem('trazo-coreano-v2', JSON.stringify({ completed:[...completed], guided, review:reviewState })); } catch { /* La práctica sigue funcionando sin almacenamiento. */ }
}
function stepsFor(word) {
  const steps = [];
  for (const syllable of word) {
    const code = syllable.codePointAt(0) - 0xAC00;
    if (code < 0 || code >= 11172) {
      steps.push({ key:syllable, syllable, part:'separador' });
      continue;
    }
    const initial = INITIAL[Math.floor(code / 588)];
    const medial = MEDIAL[Math.floor((code % 588) / 28)];
    const final = code % 28 ? FINAL[(code % 28) - 1] : null;
    steps.push({ key:initial, syllable, part:'consonante inicial' });
    for (const key of VOWEL_INPUT[medial] || [medial]) steps.push({ key, syllable, part:'vocal' });
    if (final) for (const key of FINAL_INPUT[final] || [final]) steps.push({ key, syllable, part:'consonante final' });
  }
  return steps;
}
function compose(tokens) {
  let result = '';
  let block = null;
  function flush() {
    if (!block) return;
    if (block.initial && block.vowel) {
      const l = INITIAL.indexOf(block.initial);
      const v = MEDIAL.indexOf(block.vowel);
      const t = block.final ? FINAL.indexOf(block.final) + 1 : 0;
      result += l >= 0 && v >= 0 ? String.fromCharCode(0xAC00 + (l * 21 + v) * 28 + t) : block.initial + block.vowel + (block.final || '');
    } else result += block.initial || block.vowel || '';
    block = null;
  }
  for (const key of tokens) {
    if (key === ' ') { flush(); result += ' '; continue; }
    if (CONSONANTS.has(key)) {
      if (!block) block = { initial:key, vowel:null, final:null };
      else if (!block.vowel) { flush(); block = { initial:key, vowel:null, final:null }; }
      else if (!block.final && FINAL.includes(key)) block.final = key;
      else if (block.final) {
        const combined = FINAL_COMBINATIONS[block.final + key];
        if (combined) block.final = combined;
        else { flush(); block = { initial:key, vowel:null, final:null }; }
      }
      else { flush(); block = { initial:key, vowel:null, final:null }; }
    } else if (VOWELS.has(key)) {
      if (!block) block = { initial:'ㅇ', vowel:key, final:null };
      else if (!block.vowel) block.vowel = key;
      else if (block.final) {
        let nextInitial = block.final;
        const cluster = FINAL_INPUT[block.final];
        if (cluster) {
          block.final = cluster[0];
          nextInitial = cluster[1];
        } else block.final = null;
        flush();
        block = { initial:CONSONANTS.has(nextInitial) ? nextInitial : 'ㅇ', vowel:key, final:null };
      } else {
        const combined = VOWEL_COMBINATIONS[block.vowel + key];
        if (combined) block.vowel = combined;
        else { flush(); block = { initial:'ㅇ', vowel:key, final:null }; }
      }
    } else { flush(); result += key; }
  }
  flush();
  return result;
}

function emojiAsset(emoji) {
  const points = [...emoji].map(character => character.codePointAt(0)).filter(code => code !== 0xFE0F).map(code => code.toString(16));
  return `assets/noto/emoji_u${points.join('_')}.svg`;
}

function renderCategories() {
  const activeCategory = words[currentIndex].category;
  for (const destination of [$('#category-list'), $('#mobile-categories')]) {
    destination.replaceChildren();
    categories.forEach(category => {
      const members = words.filter(word => word.category === category.id);
      const learned = members.filter(word => completed.has(word.korean)).length;
      const button = document.createElement('button');
      button.type = 'button';
      const active = !currentCollection && category.id === activeCategory;
      button.className = 'category-option' + (active ? ' active' : '');
      button.setAttribute('aria-current', active ? 'true' : 'false');
      button.setAttribute('aria-label', `${category.name}, ${learned} de ${members.length} palabras aprendidas`);
      button.innerHTML = `<span class="category-icon" aria-hidden="true">${category.icon}</span><span>${category.name}</span><small>${learned}/${members.length}</small>`;
      button.addEventListener('click', () => {
        currentCollection = null;
        reviewQueue = [];
        const firstFiltered = words.findIndex(word => word.category === category.id && (currentVocabularyCategory === 'all' || word.vocabularyCategory === currentVocabularyCategory));
        if (firstFiltered >= 0) {
          currentUnit = words[firstFiltered].unit;
          loadWord(firstFiltered);
        } else {
          currentVocabularyCategory = 'all';
          const firstUnit = studyUnits.find(unit => `topik${unit.level}` === category.id);
          if (firstUnit) currentUnit = firstUnit.id;
          loadWord(words.findIndex(word => word.unit === currentUnit));
        }
        $('#mobile-words').hidden = true;
        $('#open-words').setAttribute('aria-expanded','false');
      });
      destination.append(button);
    });
  }
  const category = categories.find(item => item.id === activeCategory);
  renderCollections();
  renderVocabularyCategorySelectors(category);
  renderUnitSelectors(category);
  const unit = studyUnits.find(item => item.id === currentUnit);
  const collection = starterCategories.find(item => item.id === currentCollection);
  const filteredCategory = vocabularyCategories.find(item => item.id === currentVocabularyCategory);
  const title = currentCollection === 'review' ? 'Repaso inteligente' : collection?.name || filteredCategory?.label;
  $('#current-category-label').textContent = (title || unit?.title || category.name).toUpperCase();
  $('#category-breadcrumb').innerHTML = currentCollection
    ? `${currentCollection === 'review' ? 'REPASO' : 'COLECCIÓN'} <span class="topline-divider">/</span> ${(title || '').toUpperCase()}`
    : currentVocabularyCategory !== 'all'
      ? `${category.name.toUpperCase()} <span class="topline-divider">/</span> ${(filteredCategory?.label || '').toUpperCase()}`
    : `${category.name.toUpperCase()} <span class="topline-divider">/</span> UNIDAD ${String(unit?.sequence || 1).padStart(2,'0')}`;
}
function renderCollections() {
  const due = dueWordKeys();
  for (const destination of [$('#collection-list'),$('#mobile-collections')]) {
    destination.replaceChildren();
    if (destination.id === 'mobile-collections' && due.length) {
      const reviewButton = document.createElement('button');
      reviewButton.type = 'button';
      reviewButton.className = `category-option${currentCollection === 'review' ? ' active' : ''}`;
      reviewButton.innerHTML = `<span class="category-icon" aria-hidden="true">↻</span><span>Repaso</span><small>${due.length}</small>`;
      reviewButton.addEventListener('click',startReviewSession);
      destination.append(reviewButton);
    }
    starterCategories.forEach(collection => {
      const members = words.filter(word => word.collection === collection.id);
      const learned = members.filter(word => completed.has(word.korean)).length;
      const button = document.createElement('button');
      button.type = 'button';
      const active = currentCollection === collection.id;
      button.className = `category-option${active ? ' active' : ''}`;
      button.setAttribute('aria-current',active ? 'true' : 'false');
      button.setAttribute('aria-label',`${collection.name}, ${learned} de ${members.length} palabras aprendidas`);
      button.innerHTML = `<span class="category-icon" aria-hidden="true">${collection.icon}</span><span>${collection.name}</span><small>${learned}/${members.length}</small>`;
      button.addEventListener('click',() => selectCollection(collection.id));
      destination.append(button);
    });
  }
}
function renderUnitSelectors(category) {
  const level = Number(category.id.replace('topik',''));
  const units = studyUnits.filter(unit => unit.level === level);
  for (const select of [$('#unit-select'),$('#mobile-unit-select')]) {
    select.replaceChildren();
    units.forEach(unit => {
      const option = document.createElement('option');
      option.value = unit.id;
      option.textContent = `Unidad ${String(unit.sequence).padStart(2,'0')} · ${unit.wordCount} palabras`;
      select.append(option);
    });
    select.value = currentUnit;
    select.disabled = Boolean(currentCollection) || currentVocabularyCategory !== 'all';
  }
}
function renderVocabularyCategorySelectors(category) {
  const level = Number(category.id.replace('topik',''));
  for (const select of [$('#vocabulary-category-select'),$('#mobile-vocabulary-category-select')]) {
    select.replaceChildren();
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Todas las categorías';
    select.append(allOption);
    vocabularyCategories.forEach(vocabularyCategory => {
      const count = words.filter(word => word.level === level && word.vocabularyCategory === vocabularyCategory.id).length;
      if (!count) return;
      const option = document.createElement('option');
      option.value = vocabularyCategory.id;
      option.textContent = `${vocabularyCategory.label} · ${count}`;
      select.append(option);
    });
    select.value = currentVocabularyCategory;
    select.disabled = Boolean(currentCollection);
  }
}
function visibleWordIndexes() {
  if (currentCollection === 'review') {
    return reviewQueue.map(korean => words.findIndex(word => word.korean === korean)).filter(index => index >= 0);
  }
  if (currentCollection) {
    return starterWords
      .filter(word => word.category === currentCollection)
      .map(starter => words.findIndex(word => word.korean === starter.korean))
      .filter(index => index >= 0);
  }
  if (currentVocabularyCategory !== 'all') {
    const activeLevel = words[currentIndex]?.level || 1;
    return words.map((word,index) => word.level === activeLevel && word.vocabularyCategory === currentVocabularyCategory ? index : -1).filter(index => index >= 0);
  }
  return words.map((word,index) => word.unit === currentUnit ? index : -1).filter(index => index >= 0);
}
function renderWordButtons() {
  const destinations = [$('#word-list'), $('#mobile-words')];
  const visible = visibleWordIndexes();
  for (const destination of destinations) {
    destination.replaceChildren();
    visible.forEach(index => {
      const word = words[index];
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'word-option' + (index === currentIndex ? ' active' : '') + (completed.has(word.korean) ? ' done' : '');
      button.setAttribute('aria-current', index === currentIndex ? 'step' : 'false');
      button.setAttribute('aria-label', `${word.korean}, ${word.spanish}${completed.has(word.korean) ? ', completada' : ''}`);
      button.innerHTML = `<span class="word-index">${String(destination.childElementCount + 1).padStart(2,'0')}</span><span class="word-name"><strong lang="ko">${word.korean}</strong><small>${completed.has(word.korean) ? word.spanish : 'Por practicar'}</small></span><span class="word-status" aria-hidden="true">✓</span>`;
      button.addEventListener('click', () => { loadWord(index); $('#mobile-words').hidden = true; $('#open-words').setAttribute('aria-expanded','false'); });
      destination.append(button);
    });
  }
}
function renderProgress() {
  const count = completed.size;
  $('#lesson-count').textContent = `${String(count).padStart(2,'0')} / ${String(words.length).padStart(2,'0')}`;
  $('#lesson-progress-fill').style.width = `${count / words.length * 100}%`;
  $('.lesson-progress').setAttribute('aria-valuemax',String(words.length));
  $('.lesson-progress').setAttribute('aria-valuenow',String(count));
  $('#progress-copy').textContent = `${count} de ${words.length} palabras aprendidas`;
  updateReviewCard();
  renderCategories();
}
function dueWordKeys() {
  const now = Date.now();
  return Object.entries(reviewState)
    .filter(([,review]) => Number(review.due) <= now)
    .sort(([,a],[,b]) => Number(a.due) - Number(b.due))
    .map(([korean]) => korean)
    .filter(korean => words.some(word => word.korean === korean));
}
function updateReviewCard() {
  const due = dueWordKeys();
  const button = $('#start-review');
  button.disabled = due.length === 0;
  $('#review-count').textContent = due.length ? `${due.length} ${due.length === 1 ? 'palabra pendiente' : 'palabras pendientes'}` : 'Nada pendiente por ahora';
}
function selectCollection(collectionId) {
  const first = starterWords.find(word => word.category === collectionId);
  const index = words.findIndex(word => word.korean === first?.korean);
  if (index < 0) return;
  currentCollection = collectionId;
  currentVocabularyCategory = 'all';
  reviewQueue = [];
  loadWord(index);
}
function startReviewSession() {
  reviewQueue = dueWordKeys();
  if (!reviewQueue.length) return;
  currentCollection = 'review';
  currentVocabularyCategory = 'all';
  const index = words.findIndex(word => word.korean === reviewQueue[0]);
  if (index >= 0) loadWord(index);
}
function detectedRating() {
  if (guidedUsed || mistakeCount >= 2) return 'hard';
  if (mistakeCount === 1) return 'good';
  return 'easy';
}
function ratingLabel(rating) {
  return { hard:'Difícil', good:'Bien', easy:'Fácil' }[rating];
}
function scheduleReview(rating,baseline=lastReviewBaseline) {
  const word = words[currentIndex];
  const previous = baseline || {};
  const oldInterval = Number(previous.interval) || 0;
  const firstIntervals = { hard:1, good:3, easy:7 };
  const factors = { hard:1, good:2, easy:2.5 };
  const interval = oldInterval
    ? Math.min(90,Math.max(firstIntervals[rating],Math.round(oldInterval * factors[rating])))
    : firstIntervals[rating];
  reviewState[word.korean] = {
    interval,
    due:Date.now() + interval * DAY,
    lastReviewed:Date.now(),
    rating,
    reviews:(Number(previous.reviews) || 0) + 1,
    lapses:(Number(previous.lapses) || 0) + (rating === 'hard' ? 1 : 0)
  };
  saveProgress();
  document.querySelectorAll('[data-rating]').forEach(button => {
    const active = button.dataset.rating === rating;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  $('#review-plan').textContent = `Detectamos: ${ratingLabel(rating)} · vuelve en ${interval === 1 ? '1 día' : `${interval} días`}.`;
  updateReviewCard();
}
function renderKeyboard() {
  const keyboard = $('#keyboard');
  keyboard.replaceChildren();
  KEY_ROWS.forEach((row,rowIndex) => {
    const container = document.createElement('div');
    container.className = 'keyboard-row';
    if (rowIndex === 2) {
      const shift = document.createElement('button');
      shift.type = 'button';
      shift.id = 'shift-key';
      shift.className = 'key key-modifier';
      shift.textContent = '⇧';
      shift.setAttribute('aria-label','Activar consonantes dobles');
      shift.setAttribute('aria-pressed','false');
      shift.addEventListener('click', () => { shiftActive = !shiftActive; syncShiftKeys(); renderGuide(); });
      container.append(shift);
    }
    row.forEach(([key,latin]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'key';
      button.dataset.key = key;
      button.dataset.base = key;
      button.dataset.latin = latin;
      button.setAttribute('aria-label', `${key}, tecla ${latin.toUpperCase()}`);
      const label = document.createElement('span');
      label.textContent = key;
      const hint = document.createElement('small');
      hint.textContent = latin.toUpperCase();
      button.append(label,hint);
      button.addEventListener('click', () => {
        const typed = shiftActive ? SHIFT_KEY[latin] || key : key;
        shiftActive = false;
        syncShiftKeys();
        addToken(typed);
      });
      container.append(button);
    });
    if (rowIndex === 2) {
      const backspace = document.createElement('button');
      backspace.type = 'button';
      backspace.className = 'key key-backspace';
      backspace.textContent = '⌫';
      backspace.setAttribute('aria-label','Borrar última letra');
      backspace.addEventListener('click',eraseToken);
      container.append(backspace);
    }
    keyboard.append(container);
  });
  const controls = document.createElement('div');
  controls.className = 'keyboard-row keyboard-controls';
  const space = document.createElement('button');
  space.type = 'button';
  space.className = 'key key-space';
  space.dataset.key = ' ';
  space.textContent = 'Espacio';
  space.addEventListener('click', () => addToken(' '));
  const done = document.createElement('button');
  done.type = 'button';
  done.className = 'key key-done';
  done.textContent = 'Listo';
  done.addEventListener('click',closeKeyboard);
  controls.append(space,done);
  keyboard.append(controls);
}
function syncShiftKeys() {
  $('#shift-key').setAttribute('aria-pressed',String(shiftActive));
  $('#shift-key').classList.toggle('active',shiftActive);
  document.querySelectorAll('.key[data-latin]').forEach(button => {
    const key = shiftActive ? SHIFT_KEY[button.dataset.latin] || button.dataset.base : button.dataset.base;
    button.dataset.key = key;
    button.querySelector('span').textContent = key;
    button.setAttribute('aria-label',`${key}, tecla ${button.dataset.latin.toUpperCase()}${shiftActive ? ' con mayúsculas' : ''}`);
  });
}
function setHint(message,tone='neutral') {
  const hint = $('#answer-hint');
  hint.textContent = message;
  hint.className = 'answer-hint' + (tone === 'neutral' ? '' : ` ${tone}`);
  $('#answer-box').classList.toggle('error',tone === 'error');
  $('#answer-box').classList.toggle('correct',tone === 'correct');
}
function renderGuide() {
  $('#guide-toggle').checked = guided;
  $('#guide-state').textContent = guided ? 'Activado' : 'Desactivado';
  $('#guide-panel').hidden = !guided;
  const steps = stepsFor(writingFor(words[currentIndex]));
  const next = steps[inputTokens.length];
  const needsShift = next && Object.values(SHIFT_KEY).includes(next.key) && !shiftActive;
  document.querySelectorAll('.key').forEach(button => button.classList.toggle('highlight',guided && !!next && (needsShift ? button.id === 'shift-key' : button.dataset.key === next.key)));
  if (!guided) return;
  $('#guide-title').textContent = next ? `Paso ${inputTokens.length + 1} de ${steps.length}` : '¡Ya están todas las letras!';
  $('#guide-copy').textContent = next ? needsShift ? `Activa ⇧ para escribir ${next.key} y formar «${next.syllable}».` : `Para formar «${next.syllable}», pulsa ${next.key} (${next.part}).` : 'Pulsa «Comprobar» para revisar tu palabra.';
  $('#guide-next').textContent = next?.key || '✓';
}
function renderAnswer() {
  $('#answer-display').value = compose(inputTokens);
  const max = stepsFor(writingFor(words[currentIndex])).length;
  $('#answer-count').textContent = `${inputTokens.length} / ${max} letras`;
  renderGuide();
}
function openKeyboard() {
  if (!mobileViewport.matches) return;
  document.body.classList.add('keyboard-open');
  $('#open-keyboard').setAttribute('aria-expanded','true');
  requestAnimationFrame(() => {
    const keyboardTop = $('#keyboard-section').getBoundingClientRect().top;
    const answerBottom = $('#answer-box').getBoundingClientRect().bottom;
    if (answerBottom > keyboardTop - 20) scrollBy({ top:answerBottom - keyboardTop + 20, behavior:'instant' });
  });
}
function closeKeyboard() {
  document.body.classList.remove('keyboard-open');
  $('#open-keyboard').setAttribute('aria-expanded','false');
}
function loadWord(index) {
  closeKeyboard();
  currentIndex = index;
  inputTokens = [];
  successShown = false;
  shiftActive = false;
  mistakeCount = 0;
  guidedUsed = guided;
  lastReviewBaseline = null;
  syncShiftKeys();
  const word = words[index];
  if (!currentCollection) currentUnit = word.unit;
  $('#target-word').textContent = writingFor(word);
  const art = $('#word-art');
  $('#word-picture').hidden = true;
  const fallback = $('#word-emoji');
  fallback.classList.toggle('word-symbol',!word.hasVisual);
  if (word.hasVisual) {
    art.hidden = false;
    fallback.hidden = true;
    art.alt = `Ilustración de ${word.imageLabel || word.spanish}, Noto Emoji`;
    art.onerror = () => { art.hidden = true; fallback.hidden = false; fallback.textContent = word.emoji; };
    art.src = emojiAsset(word.emoji);
  } else {
    art.hidden = true;
    fallback.hidden = false;
    fallback.textContent = writingFor(word);
  }
  $('#visual-caption').textContent = word.hasVisual ? 'MIRA LA IMAGEN' : 'OBSERVA LA PALABRA';
  $('#word-picture').setAttribute('aria-label',`Ilustración de ${word.imageLabel || word.spanish}`);
  fallback.setAttribute('aria-label',word.hasVisual ? `Ilustración de ${word.spanish}` : `Palabra coreana: ${writingFor(word)}`);
  const collection = starterCategories.find(item => item.id === currentCollection);
  $('.picture-side').style.background = collection?.tone || categories.find(category => category.id === word.category).tone;
  const visible = visibleWordIndexes();
  const visiblePosition = visible.indexOf(index);
  $('#word-number').textContent = String(visiblePosition + 1).padStart(2,'0');
  $('#word-total').textContent = String(visible.length).padStart(2,'0');
  $('#syllable-count').textContent = `${writingFor(word).length} ${writingFor(word).length === 1 ? 'bloque' : 'bloques'}`;
  $('#translation').textContent = word.spanish;
  $('#translation').hidden = true;
  $('#reveal-translation').hidden = false;
  $('#success-card').hidden = true;
  $('#previous-word').disabled = visiblePosition === 0;
  $('#next-word').innerHTML = visiblePosition === visible.length - 1
    ? currentCollection ? 'Volver al inicio <span aria-hidden="true">↻</span>' : 'Siguiente unidad <span aria-hidden="true">→</span>'
    : 'Siguiente palabra <span aria-hidden="true">→</span>';
  setHint(mobileViewport.matches ? 'Toca el cuadro para abrir el teclado Hangul.' : 'Puedes usar el teclado en pantalla o tu teclado físico.');
  renderWordButtons();
  renderProgress();
  renderAnswer();
}
function addToken(key) {
  if (successShown) { inputTokens = []; successShown = false; $('#success-card').hidden = true; }
  if (guided) {
    const expected = stepsFor(writingFor(words[currentIndex]))[inputTokens.length];
    if (!expected) { setHint('La palabra está completa. Pulsa «Comprobar».'); return; }
    if (key !== expected.key) { mistakeCount += 1; guidedUsed = true; setHint(`Busca la tecla ${expected.key}. La verás resaltada.`, 'error'); return; }
  }
  inputTokens.push(key);
  setHint(guided ? '¡Bien! Sigue con la siguiente letra.' : 'Sigue escribiendo o comprueba tu respuesta.');
  renderAnswer();
  if (compose(inputTokens) === writingFor(words[currentIndex]) && inputTokens.length === stepsFor(writingFor(words[currentIndex])).length) showSuccess();
}
function eraseToken() {
  if (!inputTokens.length) return;
  inputTokens.pop();
  successShown = false;
  $('#success-card').hidden = true;
  setHint('Última letra borrada.');
  renderAnswer();
}
function showSuccess() {
  if (successShown) return;
  successShown = true;
  closeKeyboard();
  completed.add(words[currentIndex].korean);
  lastReviewBaseline = reviewState[words[currentIndex].korean] ? { ...reviewState[words[currentIndex].korean] } : null;
  scheduleReview(detectedRating(),lastReviewBaseline);
  renderWordButtons();
  renderProgress();
  $('#success-korean').textContent = words[currentIndex].korean;
  $('#success-spanish').textContent = words[currentIndex].spanish;
  $('#success-card').hidden = false;
  setHint('¡Excelente! Formaste la palabra correctamente.', 'correct');
}
function checkAnswer() {
  const answer = compose(inputTokens).trim();
  if (!answer) { setHint('Escribe la palabra antes de comprobarla.','error'); return; }
  if (answer === writingFor(words[currentIndex])) { showSuccess(); return; }
  mistakeCount += 1;
  if (guided) setHint('Todavía faltan letras. Sigue la tecla resaltada.','error');
  else setHint('Aún no coincide. Puedes borrar una letra o activar la guía.','error');
}
function speak() {
  speakKorean(writingFor(words[currentIndex]));
}
function selectUnit(unitId) {
  const index = words.findIndex(word => word.unit === unitId);
  if (index < 0) return;
  currentCollection = null;
  currentVocabularyCategory = 'all';
  reviewQueue = [];
  currentUnit = unitId;
  loadWord(index);
}
function selectVocabularyCategory(categoryId) {
  const activeLevel = words[currentIndex]?.level || 1;
  const index = categoryId === 'all'
    ? words.findIndex(word => word.unit === currentUnit)
    : words.findIndex(word => word.level === activeLevel && word.vocabularyCategory === categoryId);
  if (index < 0) return;
  currentCollection = null;
  reviewQueue = [];
  currentVocabularyCategory = categoryId;
  if (categoryId !== 'all') currentUnit = words[index].unit;
  loadWord(index);
  $('#mobile-words').hidden = true;
  $('#open-words').setAttribute('aria-expanded','false');
}
function moveWord(direction) {
  const visible = visibleWordIndexes();
  const position = visible.indexOf(currentIndex);
  if (direction < 0 && position > 0) loadWord(visible[position - 1]);
  if (direction > 0 && position < visible.length - 1) loadWord(visible[position + 1]);
  if (direction > 0 && position === visible.length - 1) {
    if (currentCollection) loadWord(visible[0]);
    else loadWord((currentIndex + 1) % words.length);
  }
}
function speakKorean(text) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) { setHint('Tu navegador no ofrece pronunciación en este dispositivo.'); return; }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = .82;
  const koreanVoice = speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith('ko'));
  if (koreanVoice) utterance.voice = koreanVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function setMode(mode) {
  const wordsMode = mode === 'words';
  $('.layout').hidden = !wordsMode;
  $('#grammar-view').hidden = wordsMode;
  $('#hear-word').hidden = !wordsMode;
  $('#show-words').classList.toggle('active',wordsMode);
  $('#show-grammar').classList.toggle('active',!wordsMode);
  $('#show-words').setAttribute('aria-pressed',String(wordsMode));
  $('#show-grammar').setAttribute('aria-pressed',String(!wordsMode));
  closeKeyboard();
  scrollTo({ top:0, behavior:'smooth' });
}
function renderGrammarLevels() {
  const select = $('#grammar-level-select');
  select.replaceChildren();
  [...new Set(grammarLessons.map(lesson => lesson.courseLevel))].forEach(level => {
    const option = document.createElement('option');
    option.value = String(level);
    option.textContent = `Nivel ${level}`;
    select.append(option);
  });
}
function renderGrammarList(level) {
  const destination = $('#grammar-lessons');
  destination.replaceChildren();
  grammarLessons.filter(lesson => lesson.courseLevel === level).forEach(lesson => {
    const button = document.createElement('button');
    const active = lesson.id === currentGrammarId;
    button.type = 'button';
    button.className = `grammar-lesson${active ? ' active' : ''}`;
    button.dataset.grammar = lesson.id;
    button.setAttribute('aria-current',String(active));
    const compactTitle = lesson.title.split('—')[0].trim();
    button.innerHTML = `<span>${String(lesson.sequence).padStart(2,'0')}</span><strong>${compactTitle}</strong><small>${lesson.theme}</small>`;
    button.addEventListener('click',() => renderGrammar(lesson.id));
    destination.append(button);
  });
}
function renderGrammar(id) {
  const lesson = grammarLessons.find(item => item.id === id) || grammarLessons[0];
  if (!lesson) return;
  currentGrammarId = lesson.id;
  $('#grammar-level-select').value = String(lesson.courseLevel);
  renderGrammarList(lesson.courseLevel);
  const example = lesson.examples[0] || { korean:lesson.title, spanish:'' };
  $('#grammar-step').textContent = `NIVEL ${lesson.courseLevel} / ${lesson.courseTitle.toUpperCase()}`;
  $('.grammar-level').textContent = `TOPIK I · ${grammarLessons.indexOf(lesson) + 1} DE ${grammarLessons.length}`;
  $('#grammar-title').textContent = lesson.title;
  $('#grammar-intro').textContent = lesson.simpleExplanation || lesson.summary;
  $('#grammar-sentence').setAttribute('aria-label',example.korean);
  $('.sentence-part.subject').textContent = example.korean;
  $('.sentence-part.particle').hidden = true;
  $('.sentence-part.rest').hidden = true;
  $('#legend-subject').textContent = example.korean;
  $('#legend-subject').nextElementSibling.textContent = example.spanish;
  $('#legend-particle').parentElement.hidden = true;
  $('#legend-rest').parentElement.hidden = true;
  $('#grammar-rule-title').textContent = lesson.title;
  $('#grammar-rule').textContent = lesson.summary;
  $('#grammar-text').textContent = lesson.examples.map(item => item.korean).join(' · ') || example.korean;
  $('#grammar-translation').textContent = lesson.examples.map(item => item.spanish).join(' · ') || example.spanish;
  $('#grammar-translation').hidden = true;
  $('#reveal-text').hidden = false;
}

loadProgress();
renderKeyboard();
loadWord(0);
renderGrammarLevels();
renderGrammar(currentGrammarId);
$('#guide-toggle').addEventListener('change', event => { guided = event.target.checked; if (guided) guidedUsed = true; saveProgress(); renderGuide(); setHint(guided ? 'La siguiente tecla está resaltada.' : 'Ahora puedes practicar sin guía.'); });
$('#erase-key').addEventListener('click',eraseToken);
$('#clear-answer').addEventListener('click',() => { inputTokens=[]; successShown=false; $('#success-card').hidden=true; setHint('Empecemos de nuevo.'); renderAnswer(); });
$('#check-answer').addEventListener('click',checkAnswer);
$('#previous-word').addEventListener('click',() => moveWord(-1));
$('#next-word').addEventListener('click',() => moveWord(1));
$('#success-next').addEventListener('click',() => moveWord(1));
$('#start-review').addEventListener('click',startReviewSession);
document.querySelectorAll('[data-rating]').forEach(button => button.addEventListener('click',() => scheduleReview(button.dataset.rating,lastReviewBaseline)));
$('#unit-select').addEventListener('change',event => selectUnit(event.target.value));
$('#mobile-unit-select').addEventListener('change',event => selectUnit(event.target.value));
$('#vocabulary-category-select').addEventListener('change',event => selectVocabularyCategory(event.target.value));
$('#mobile-vocabulary-category-select').addEventListener('change',event => selectVocabularyCategory(event.target.value));
$('#hear-word').addEventListener('click',speak);
$('#hear-word-inline').addEventListener('click',speak);
$('#reveal-translation').addEventListener('click',() => { $('#translation').hidden=false; $('#reveal-translation').hidden=true; });
$('#show-words').addEventListener('click',() => setMode('words'));
$('#show-grammar').addEventListener('click',() => setMode('grammar'));
$('#grammar-level-select').addEventListener('change',event => {
  const lesson = grammarLessons.find(item => item.courseLevel === Number(event.target.value));
  if (lesson) renderGrammar(lesson.id);
});
$('#hear-example').addEventListener('click',() => {
  const lesson = grammarLessons.find(item => item.id === currentGrammarId);
  if (lesson) speakKorean(lesson.examples[0]?.korean || lesson.title);
});
$('#reveal-text').addEventListener('click',() => { $('#grammar-translation').hidden=false; $('#reveal-text').hidden=true; });
$('#show-tip').addEventListener('click',() => $('#hangul-dialog').showModal());
$('#answer-display').addEventListener('click',openKeyboard);
$('#open-keyboard').addEventListener('click',openKeyboard);
$('#close-keyboard').addEventListener('click',closeKeyboard);
mobileViewport.addEventListener('change',closeKeyboard);
$('#open-words').addEventListener('click',() => { const menu=$('#mobile-words'); menu.hidden=!menu.hidden; $('#open-words').setAttribute('aria-expanded',String(!menu.hidden)); });
window.addEventListener('keydown',event => {
  if (!$('#grammar-view').hidden) return;
  if ($('#hangul-dialog').open || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
  if (event.key === 'Escape' && document.body.classList.contains('keyboard-open')) { event.preventDefault(); closeKeyboard(); return; }
  if (event.key === 'Backspace') { event.preventDefault(); eraseToken(); return; }
  if (event.key === 'Enter' && (event.target === document.body || event.target === $('#answer-display'))) { event.preventDefault(); checkAnswer(); return; }
  if (event.key === ' ' && (event.target === document.body || event.target === $('#answer-display'))) { event.preventDefault(); addToken(' '); return; }
  if (event.target instanceof HTMLElement && event.target.closest('label, input:not(#answer-display)')) return;
  const key = event.key.length === 1 ? event.key.toLowerCase() : '';
  const jamo = event.shiftKey ? SHIFT_KEY[key] || LATIN_KEY[key] : LATIN_KEY[key];
  if (jamo) { event.preventDefault(); addToken(jamo); }
});
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load',() => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
