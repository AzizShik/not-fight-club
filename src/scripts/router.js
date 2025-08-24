import { initBattle } from './components/battle';
import { initCharacter } from './components/character';
import { initHome } from './components/home';
import { initRegister } from './components/register';
import { initSettings } from './components/settings';
import { initToolbar } from './components/toolbar';
import { capitalazeFirstLetter } from './utils/capitalaze';

const routes = {
  // '/register': '/views/register.html',
  // '/home': '/views/home.html',
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

// export const changeWindowHash = (hash) => {
//   window.history.pushState({}, '', hash);
// };

export const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path];
  const html = await fetch(route).then((data) => data.text());
  const toolBar = await fetch('./views/toolbar.html').then((data) =>
    data.text(),
  );

  document.getElementById('root').innerHTML = html;
  document.getElementById('root').innerHTML += toolBar;

  const initialize = {
    '/': initRegister,
    '/home': initHome,
    '/character': initCharacter,
    '/settings': initSettings,
    '/battle': initBattle,
  };

  const initFunc = initialize[path];

  initFunc();
  initToolbar();
};

window.addEventListener('popstate', handleLocation);
