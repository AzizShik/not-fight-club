import { gameState } from './state';
import { loadGameState, saveGameState } from './storage';
import { initCharacter } from './components/character';
import { initHome } from './components/home';
import { initSettings } from './components/settings';
import { initBattle } from './components/battle';

import frodoAvatarImg from '../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../assets/images/character_legolas.jpg';
import { changeWindowHash, handleLocation, router } from './router';
import { initRegister } from './components/register';
import { initToolbar } from './components/toolbar';

export async function initScreens() {
  loadGameState();
  if (gameState.player.name) {
    await showScreen('./views/home.html');
    await addToScreen('./views/toolbar.html');
    await initToolbar();
    await initHome();
    handleLocation();
  } else {
    gameState.player.avatar = frodoAvatarImg;
    await showScreen('./views/register.html');
    await initRegister();
  }
}

export async function showScreen(pathToView) {
  const html = await fetch(pathToView).then((data) => data.text());
  document.getElementById('root').innerHTML = html;
}

export async function addToScreen(pathToView) {
  const html = await fetch(pathToView).then((data) => data.text());
  document.getElementById('root').innerHTML += html;
}
