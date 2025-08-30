import { initBattle } from './components/battle';
import { initBurger } from './components/burger';
import { initCharacter } from './components/character';
import { initHome } from './components/home';
import { initRegister } from './components/register';
import { initSettings } from './components/settings';
import { initToolbar } from './components/toolbar';
import { addSoundsToButtons } from './sounds';
import { gameState } from './state';

const routes = {
  '/register': 'views/register.html',
  '/home': 'views/home.html',
  '/character': 'views/character.html',
  '/settings': 'views/settings.html',
  '/battle': 'views/battle.html',
};

export const router = async (e) => {
  const el = e.target;
  const path = el.dataset.link;

  window.location.hash = path;
  await handleLocation();
};

export const changeWindowHash = (hash) => {
  window.location.hash = hash;
};

export const handleLocation = async () => {
  let path = window.location.hash.replace('#', '') || '/home';
  const route = routes[path] || 'views/home.html';

  try {
    const html = await fetch(route).then((res) => res.text());

    if (gameState.player.name && path !== '/register') {
      const toolBar = await fetch('views/toolbar.html').then((res) =>
        res.text(),
      );
      document.getElementById('root').innerHTML = html + toolBar;
      await initToolbar();
      await initBurger();
    } else {
      document.getElementById('root').innerHTML = html;
    }

    const initialize = {
      '/home': initHome,
      '/register': initRegister,
      '/character': initCharacter,
      '/settings': initSettings,
      '/battle': initBattle,
    };

    const initFunc = initialize[path] || initHome;
    initFunc();

    addSoundsToButtons(0.05);
  } catch (err) {
    console.error('Error loading route:', err);
    changeWindowHash('/home');
    initHome();
  }
};

window.addEventListener('hashchange', handleLocation);
