const samples = {
  apple: { korean: '사과', spanish: 'manzana', noto: 'noto-apple.svg', fluent: 'fluent-apple.png', photo: 'openverse-apple.jpg', sizes: ['2,1 KB', '44,0 KB', '136,5 KB'], source: 'https://openverse.org/image/ae9def31-39f4-4056-8df3-135b19a2ddc7', original: 'https://www.flickr.com/photos/53575715@N02/6284756738', authorUrl: 'https://www.flickr.com/photos/53575715@N02', title: 'Apples', author: 'astronomy_blog', alt: 'Fotografía de manzanas encontrada en Openverse' },
  cat: { korean: '고양이', spanish: 'gato', noto: 'noto-cat.svg', fluent: 'fluent-cat.png', photo: 'openverse-cat.jpg', sizes: ['3,6 KB', '37,7 KB', '313,3 KB'], source: 'https://openverse.org/image/de42d499-d660-47b4-b203-28d5589c31d2', original: 'https://www.flickr.com/photos/29468339@N02/5840168826', authorUrl: 'https://www.flickr.com/photos/29468339@N02', title: 'Cat bliss', author: '@Doug88888', alt: 'Fotografía de un gato encontrada en Openverse' },
  tree: { korean: '나무', spanish: 'árbol', noto: 'noto-tree.svg', fluent: 'fluent-tree.png', photo: 'openverse-tree.jpg', sizes: ['2,1 KB', '28,5 KB', '186,6 KB'], source: 'https://openverse.org/image/1cc14637-78d3-4442-9335-960bca106195', original: 'https://www.flickr.com/photos/12771303@N00/96442418', authorUrl: 'https://www.flickr.com/photos/12771303@N00', title: 'Perfect tree', author: 'Daveybot', alt: 'Fotografía de un árbol sin hojas encontrada en Openverse' }
};

const tabs = [...document.querySelectorAll('.word-tab')];
const panel = document.querySelector('#comparison-panel');
function showWord(key, focus = false) {
  const sample = samples[key];
  if (!sample) return;
  tabs.forEach(tab => {
    const active = tab.dataset.word === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  const activeTab = tabs.find(tab => tab.dataset.word === key);
  panel.setAttribute('aria-labelledby', activeTab.id);
  document.querySelector('#word-title').innerHTML = `${sample.korean} <span>${sample.spanish}</span>`;
  [['noto', sample.noto, sample.sizes[0]], ['fluent', sample.fluent, sample.sizes[1]], ['openverse', sample.photo, sample.sizes[2]]].forEach(([id, filename, size]) => {
    const image = document.querySelector(`#${id}-image`);
    image.src = `assets/comparativa/${filename}`;
    image.alt = id === 'openverse' ? sample.alt : `${sample.spanish} en estilo ${id === 'noto' ? 'Noto Emoji' : 'Fluent Emoji'}`;
    document.querySelector(`#${id}-size`).textContent = size;
  });
  document.querySelector('#openverse-source').href = sample.source;
  const photoTitle = document.querySelector('#photo-title');
  const photoAuthor = document.querySelector('#photo-author');
  photoTitle.href = sample.original;
  photoTitle.textContent = `“${sample.title}”`;
  photoAuthor.href = sample.authorUrl;
  photoAuthor.textContent = sample.author;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showWord(tab.dataset.word));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    showWord(tabs[next].dataset.word, true);
  });
});
