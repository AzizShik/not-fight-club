import { gameState } from './state';
import { loadGameState, saveGameState } from './storage';
import { initCharacter } from './components/character';
import { initHome } from './components/home';
import { initSettings } from './components/settings';

import frodoAvatarImg from '../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../assets/images/character_legolas.jpg';

export function initScreens() {
  loadGameState();

  const registerScreenEl = document.querySelector('[data-screen="register"]');
  const homeScreenEl = document.querySelector('[data-screen="home"]');
  const characterScreenEl = document.querySelector('[data-screen="character"]');
  const settingsScreenEl = document.querySelector('[data-screen="settings"]');
  const battleScreenEl = document.querySelector('[data-screen="battle"]');

  const toolbarNavEl = document.querySelector('[data-screen="toolbar"]');
  const tollbarPageTitle = document.querySelector('[data-page_title]');

  const screens = {
    register: registerScreenEl,
    home: homeScreenEl,
    character: characterScreenEl,
    settings: settingsScreenEl,
    battle: battleScreenEl,
  };

  const registerBtn = document.querySelector('[data-register_btn]');
  const registerInput = document.querySelector('[data-register_input]');
  const homeTitleName = document.querySelector('[data-home_title_name]');

  const toolbarHomeBtn = document.querySelector('[data-page_btn="home"]');
  const toolbarCharacterBtn = document.querySelector(
    '[data-page_btn="character"]',
  );
  const toolbarSettingsBtn = document.querySelector(
    '[data-page_btn="settings"]',
  );

  if (gameState.player.name) {
    homeScreenEl.classList.add('active');
    homeTitleName.textContent = gameState.player.name;
    toolbarNavEl.classList.add('active');
  } else {
    registerScreenEl.classList.add('active');
    gameState.player.avatar = frodoAvatarImg;
    toolbarNavEl.classList.remove('active');
  }

  registerBtn.addEventListener('click', () => {
    const inputName = registerInput.value.trim();
    gameState.player.name = inputName;

    toolbarNavEl.classList.add('active');

    saveGameState();
    switchScreen('home', screens);
  });

  registerInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 1) {
      registerBtn.disabled = false;
    } else {
      registerBtn.disabled = true;
    }
  });

  toolbarHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchScreen('home', screens);
    initHome();
  });

  toolbarCharacterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchScreen('character', screens);
    initCharacter();
  });

  toolbarSettingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchScreen('settings', screens);
    initSettings();
  });
}

function switchScreen(name, screens) {
  const tollbarPageTitle = document.querySelector('[data-page_title]');

  Object.values(screens).forEach((s) => s.classList.remove('active'));
  screens[name].classList.add('active');
  tollbarPageTitle.textContent = capitalazeFirstLetter(name);
}

function capitalazeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}
