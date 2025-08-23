import '../styles/main.scss';
import { gameState } from './state';
import { loadGameState } from './storage';
import { initScreens } from './screens';

import { initCharacter } from './components/character';
import { initRegister } from './components/register';
import { initSettings } from './components/settings';
import { initBattle } from './components/battle';

// initRegister();
// initCharacter();
// initSettings();

window.addEventListener('DOMContentLoaded', () => {
  loadGameState();
  initScreens();

  // loadGameState();
  // initBattle();
});
