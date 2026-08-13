// Bilingual content is stored directly in the HTML so the site remains fast,
// searchable, and easy to deploy without a content-management system.
const languageButtons = document.querySelectorAll('[data-lang]');
const translatableElements = document.querySelectorAll('[data-en][data-zh]');
const englishBlocks = document.querySelectorAll('[data-en-block]');
const chineseBlocks = document.querySelectorAll('[data-zh-block]');

function setLanguage(language) {
  const isChinese = language === 'zh';
  document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  document.title = isChinese ? '陈双双 | 语用学、汉语话语与语言智能' : 'Dr. Shuangshuang Chen | Pragmatics, Chinese Discourse and Language Intelligence';

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  englishBlocks.forEach((block) => { block.hidden = isChinese; });
  chineseBlocks.forEach((block) => { block.hidden = !isChinese; });

  languageButtons.forEach((button) => {
    const selected = button.dataset.lang === language;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  localStorage.setItem('preferredLanguage', language);
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

// Restore a prior choice; otherwise respect the visitor's browser language.
const savedLanguage = localStorage.getItem('preferredLanguage');
const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');
setLanguage(initialLanguage);

// Accessible publication category tabs.
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = document.querySelectorAll('[role="tabpanel"]');

function activateTab(tab) {
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== tab.dataset.tab; });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab = tabs[(index + step + tabs.length) % tabs.length];
    activateTab(nextTab);
    nextTab.focus();
  });
});

// Compact mobile navigation.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 1050) closeMenu(); });

// Indicate the section currently in view without adding scroll animations.
const navLinks = [...navigation.querySelectorAll('a')];
const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65%', threshold: 0 });

observedSections.forEach((section) => sectionObserver.observe(section));
document.getElementById('current-year').textContent = new Date().getFullYear();
