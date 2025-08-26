import '../styles/main.scss';
import { gameState } from './state';
import { loadGameState } from './storage';
import { initScreens } from './screens';

import { initCharacter } from './components/character';
import { initRegister } from './components/register';
import { initSettings } from './components/settings';
import { initBattle } from './components/battle';
import {
  addSoundsToButtons,
  createSound,
  initBackgroundMusic,
  setUserInteracted,
} from './sounds';

// initRegister();
// initCharacter();
// initSettings();

initBackgroundMusic();

window.addEventListener('DOMContentLoaded', () => {
  loadGameState();
  initScreens();

  function enableSounds() {
    setUserInteracted();
    document.removeEventListener('click', enableSounds);
    document.removeEventListener('keydown', enableSounds);
    document.removeEventListener('touchstart', enableSounds);
  }

  document.addEventListener('click', enableSounds, { once: true });
  document.addEventListener('keydown', enableSounds, { once: true });
  document.addEventListener('touchstart', enableSounds, { once: true });

  // loadGameState();
  // initBattle();
});
