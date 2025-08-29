import { gameState } from './state';
import { loadGameState, saveGameState } from './storage';

import frodoAvatarImg from '../assets/images/character_frodo.jpg';

import { changeWindowHash, handleLocation, router } from './router';
import { addSoundsToButtons } from './sounds';

export async function initScreens() {
  loadGameState();

  if (!gameState.player.name) {
    gameState.player.avatar = frodoAvatarImg;
    changeWindowHash('/register');
    await handleLocation();
  } else {
    changeWindowHash('/home');
    await handleLocation();
  }
}

export async function showScreen(pathToView) {
  const html = await fetch(pathToView).then((data) => data.text());
  document.getElementById('root').innerHTML = html;
  addSoundsToButtons(0.05);
}

export async function addToScreen(pathToView) {
  const html = await fetch(pathToView).then((data) => data.text());
  document.getElementById('root').innerHTML += html;
  addSoundsToButtons(0.05);
}
