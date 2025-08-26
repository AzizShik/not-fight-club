import { initBattle } from './components/battle';
import { initCharacter } from './components/character';
import { initHome } from './components/home';
import { initRegister } from './components/register';
import { initSettings } from './components/settings';
import { initToolbar } from './components/toolbar';
import { initScreens } from './screens';
import { addSoundsToButtons } from './sounds';
import { capitalazeFirstLetter } from './utils/capitalaze';

const routes = {
  '/register': '/views/register.html',
  '/index.html': '/views/home.html',
  '/': '/views/home.html',
  '/home': '/views/home.html',
  '/character': '/views/character.html',
  '/settings': '/views/settings.html',
  '/battle': '/views/battle.html',
};

export const router = async (e) => {
  const el = e.target;
  const path = el.dataset.link;

  window.history.pushState({}, '', path);
  await handleLocation();
};

export const changeWindowHash = (hash) => {
  window.history.pushState({}, '', hash);
};

export const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || '/home';

  if (path === '/') {
    changeWindowHash('/home');
    initScreens();
  }

  if (path === '/index.html') {
    changeWindowHash('/home');
    initScreens();
  }

  if (!routes[path]) {
    changeWindowHash('/home');
    initScreens();
  }

  const html = await fetch(route).then((data) => data.text());
  const toolBar = await fetch('./views/toolbar.html').then((data) =>
    data.text(),
  );

  document.getElementById('root').innerHTML = html;
  document.getElementById('root').innerHTML += toolBar;

  const initialize = {
    '/': initHome,
    '/index.html': initHome,
    '/home': initHome,
    '/register': initRegister,
    '/character': initCharacter,
    '/settings': initSettings,
    '/battle': initBattle,
  };

  let initFunc = initialize[path];

  if (!initFunc) {
    initFunc = initHome;
  } else {
    initFunc();
  }

  initToolbar();
  addSoundsToButtons(0.05);
};

window.addEventListener('popstate', handleLocation);
