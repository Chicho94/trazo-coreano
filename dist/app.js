const categories = [
  { id:'comida', name:'Comida y bebida', icon:'🍽️', tone:'#f8efe5' },
  { id:'animales', name:'Animales', icon:'🐾', tone:'#f4eee9' },
  { id:'casa', name:'Casa y objetos', icon:'🏠', tone:'#f3f0e7' },
  { id:'naturaleza', name:'Naturaleza', icon:'🌿', tone:'#edf3e9' },
  { id:'personas', name:'Personas', icon:'👋', tone:'#f4edf0' },
  { id:'lugares', name:'Lugares', icon:'📍', tone:'#eaf1f3' }
];
const words = [
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

const INITIAL = [...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'];
const MEDIAL = [...'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'];
const FINAL = [...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];
const CONSONANTS = new Set(INITIAL);
const VOWELS = new Set(MEDIAL);
const VOWEL_INPUT = { 'ㅘ':['ㅗ','ㅏ'], 'ㅙ':['ㅗ','ㅐ'], 'ㅚ':['ㅗ','ㅣ'], 'ㅝ':['ㅜ','ㅓ'], 'ㅞ':['ㅜ','ㅔ'], 'ㅟ':['ㅜ','ㅣ'], 'ㅢ':['ㅡ','ㅣ'] };
const VOWEL_COMBINATIONS = Object.fromEntries(Object.entries(VOWEL_INPUT).map(([combined, parts]) => [parts.join(''), combined]));
const FINAL_INPUT = { 'ㄳ':['ㄱ','ㅅ'], 'ㄵ':['ㄴ','ㅈ'], 'ㄶ':['ㄴ','ㅎ'], 'ㄺ':['ㄹ','ㄱ'], 'ㄻ':['ㄹ','ㅁ'], 'ㄼ':['ㄹ','ㅂ'], 'ㄽ':['ㄹ','ㅅ'], 'ㄾ':['ㄹ','ㅌ'], 'ㄿ':['ㄹ','ㅍ'], 'ㅀ':['ㄹ','ㅎ'], 'ㅄ':['ㅂ','ㅅ'] };
const KEY_ROWS = [
  [['ㅂ','q'],['ㅈ','w'],['ㄷ','e'],['ㄱ','r'],['ㅅ','t'],['ㅛ','y'],['ㅕ','u'],['ㅑ','i'],['ㅐ','o'],['ㅔ','p']],
  [['ㅁ','a'],['ㄴ','s'],['ㅇ','d'],['ㄹ','f'],['ㅎ','g'],['ㅗ','h'],['ㅓ','j'],['ㅏ','k'],['ㅣ','l']],
  [['ㅋ','z'],['ㅌ','x'],['ㅊ','c'],['ㅍ','v'],['ㅠ','b'],['ㅜ','n'],['ㅡ','m']]
];
const LATIN_KEY = Object.fromEntries(KEY_ROWS.flat().map(([jamo,key]) => [key,jamo]));
const SHIFT_KEY = { q:'ㅃ', w:'ㅉ', e:'ㄸ', r:'ㄲ', t:'ㅆ', o:'ㅒ', p:'ㅖ' };
const $ = selector => document.querySelector(selector);
let currentIndex = 0;
let inputTokens = [];
let completed = new Set();
let guided = false;
let successShown = false;
let shiftActive = false;
const mobileViewport = matchMedia('(max-width: 760px)');

function loadProgress() {
  try {
    const current = localStorage.getItem('trazo-coreano-v2');
    const saved = JSON.parse(current || localStorage.getItem('trazo-coreano-v1') || '{}');
    const previousWords = ['사과','물','집','책','나무','고양이','커피','우유','바나나'];
    const knownWords = new Set(words.map(word => word.korean));
    completed = new Set(Array.isArray(saved.completed) ? saved.completed.map(item => typeof item === 'number' ? previousWords[item] : item).filter(item => knownWords.has(item)) : []);
    guided = saved.guided === true;
  } catch { completed = new Set(); }
}
function saveProgress() {
  try { localStorage.setItem('trazo-coreano-v2', JSON.stringify({ completed:[...completed], guided })); } catch { /* La práctica sigue funcionando sin almacenamiento. */ }
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
      else { flush(); block = { initial:key, vowel:null, final:null }; }
    } else if (VOWELS.has(key)) {
      if (!block) block = { initial:'ㅇ', vowel:key, final:null };
      else if (!block.vowel) block.vowel = key;
      else if (block.final) {
        const nextInitial = block.final;
        block.final = null;
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

function renderCategories() {
  const activeCategory = words[currentIndex].category;
  for (const destination of [$('#category-list'), $('#mobile-categories')]) {
    destination.replaceChildren();
    categories.forEach((category,categoryIndex) => {
      const members = words.filter(word => word.category === category.id);
      const learned = members.filter(word => completed.has(word.korean)).length;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category-option' + (category.id === activeCategory ? ' active' : '');
      button.setAttribute('aria-current', category.id === activeCategory ? 'true' : 'false');
      button.setAttribute('aria-label', `${category.name}, ${learned} de ${members.length} palabras aprendidas`);
      button.innerHTML = `<span class="category-icon" aria-hidden="true">${category.icon}</span><span>${category.name}</span><small>${learned}/${members.length}</small>`;
      button.addEventListener('click', () => {
        loadWord(words.findIndex(word => word.category === category.id));
        $('#mobile-words').hidden = true;
        $('#open-words').setAttribute('aria-expanded','false');
      });
      destination.append(button);
    });
  }
  const category = categories.find(item => item.id === activeCategory);
  $('#current-category-label').textContent = category.name.toUpperCase();
  $('#category-breadcrumb').innerHTML = `LECCIÓN ${String(categories.indexOf(category) + 1).padStart(2,'0')} <span class="topline-divider">/</span> ${category.name.toUpperCase()}`;
}
function renderWordButtons() {
  const destinations = [$('#word-list'), $('#mobile-words')];
  const activeCategory = words[currentIndex].category;
  for (const destination of destinations) {
    destination.replaceChildren();
    words.forEach((word,index) => {
      if (word.category !== activeCategory) return;
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
  $('.lesson-progress').setAttribute('aria-valuenow',String(count));
  $('#progress-copy').textContent = `${count} de ${words.length} palabras aprendidas`;
  renderCategories();
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
  const steps = stepsFor(words[currentIndex].korean);
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
  const max = stepsFor(words[currentIndex].korean).length;
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
  syncShiftKeys();
  const word = words[index];
  $('#target-word').textContent = word.korean;
  $('#word-picture').toggleAttribute('hidden',!word.image);
  $('#word-emoji').hidden = !!word.image;
  if (word.image) $('#word-picture-use').setAttribute('href',`#ill-${word.image}`);
  $('#word-picture').setAttribute('aria-label',`Ilustración de ${word.imageLabel || word.spanish}`);
  $('#word-emoji').textContent = word.emoji;
  $('#word-emoji').setAttribute('aria-label',`Ilustración de ${word.spanish}`);
  $('.picture-side').style.background = categories.find(category => category.id === word.category).tone;
  $('#word-number').textContent = String(index + 1).padStart(2,'0');
  $('#word-total').textContent = String(words.length).padStart(2,'0');
  $('#syllable-count').textContent = `${word.korean.length} ${word.korean.length === 1 ? 'bloque' : 'bloques'}`;
  $('#translation').textContent = word.spanish;
  $('#translation').hidden = true;
  $('#reveal-translation').hidden = false;
  $('#success-card').hidden = true;
  $('#previous-word').disabled = index === 0;
  $('#next-word').innerHTML = index === words.length - 1 ? 'Volver al inicio <span aria-hidden="true">↻</span>' : 'Siguiente palabra <span aria-hidden="true">→</span>';
  setHint(mobileViewport.matches ? 'Toca el cuadro para abrir el teclado Hangul.' : 'Puedes usar el teclado en pantalla o tu teclado físico.');
  renderWordButtons();
  renderProgress();
  renderAnswer();
}
function addToken(key) {
  if (successShown) { inputTokens = []; successShown = false; $('#success-card').hidden = true; }
  if (guided) {
    const expected = stepsFor(words[currentIndex].korean)[inputTokens.length];
    if (!expected) { setHint('La palabra está completa. Pulsa «Comprobar».'); return; }
    if (key !== expected.key) { setHint(`Busca la tecla ${expected.key}. La verás resaltada.`, 'error'); return; }
  }
  inputTokens.push(key);
  setHint(guided ? '¡Bien! Sigue con la siguiente letra.' : 'Sigue escribiendo o comprueba tu respuesta.');
  renderAnswer();
  if (compose(inputTokens) === words[currentIndex].korean && inputTokens.length === stepsFor(words[currentIndex].korean).length) showSuccess();
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
  saveProgress();
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
  if (answer === words[currentIndex].korean) { showSuccess(); return; }
  if (guided) setHint('Todavía faltan letras. Sigue la tecla resaltada.','error');
  else setHint('Aún no coincide. Puedes borrar una letra o activar la guía.','error');
}
function speak() {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) { setHint('Tu navegador no ofrece pronunciación en este dispositivo.'); return; }
  const utterance = new SpeechSynthesisUtterance(words[currentIndex].korean);
  utterance.lang = 'ko-KR';
  utterance.rate = .82;
  const koreanVoice = speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith('ko'));
  if (koreanVoice) utterance.voice = koreanVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

loadProgress();
renderKeyboard();
loadWord(0);
$('#guide-toggle').addEventListener('change', event => { guided = event.target.checked; saveProgress(); renderGuide(); setHint(guided ? 'La siguiente tecla está resaltada.' : 'Ahora puedes practicar sin guía.'); });
$('#erase-key').addEventListener('click',eraseToken);
$('#clear-answer').addEventListener('click',() => { inputTokens=[]; successShown=false; $('#success-card').hidden=true; setHint('Empecemos de nuevo.'); renderAnswer(); });
$('#check-answer').addEventListener('click',checkAnswer);
$('#previous-word').addEventListener('click',() => { if (currentIndex > 0) loadWord(currentIndex - 1); });
$('#next-word').addEventListener('click',() => loadWord((currentIndex + 1) % words.length));
$('#success-next').addEventListener('click',() => loadWord((currentIndex + 1) % words.length));
$('#hear-word').addEventListener('click',speak);
$('#hear-word-inline').addEventListener('click',speak);
$('#reveal-translation').addEventListener('click',() => { $('#translation').hidden=false; $('#reveal-translation').hidden=true; });
$('#show-tip').addEventListener('click',() => $('#hangul-dialog').showModal());
$('#answer-display').addEventListener('click',openKeyboard);
$('#open-keyboard').addEventListener('click',openKeyboard);
$('#close-keyboard').addEventListener('click',closeKeyboard);
mobileViewport.addEventListener('change',closeKeyboard);
$('#open-words').addEventListener('click',() => { const menu=$('#mobile-words'); menu.hidden=!menu.hidden; $('#open-words').setAttribute('aria-expanded',String(!menu.hidden)); });
window.addEventListener('keydown',event => {
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
