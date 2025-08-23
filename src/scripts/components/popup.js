import { gameState } from '../state';

import frodoAvatarImg from '../../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../../assets/images/character_legolas.jpg';
import { saveGameState } from '../storage';
import { initCharacter } from './character';
import { initBattle, cleanBattleLogsHTML } from './battle';
import { switchScreen } from '../screens';

let popupClickHandler = null;
let frodoClickHandler = null;
let gandalfAvatarClickHandler = null;
let aragornAvatarClickHandler = null;
let legolasAvatarClickHandler = null;
let newFightResultsBtnHandler = null;
let changeCharacterResultsBtnHandler = null;

export function showPopup(parentElement) {
  const body = document.querySelector('body');
  const popup = document.querySelector(parentElement);
  const popupContainer = popup.querySelector('[data-popup_container]');

  const popupShowAnimation = [{ opacity: '0' }, { opacity: '1' }];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  popupContainer.animate(popupShowAnimation, popupTiming);
  popup.classList.add('popup--active');
  body.classList.add('lock');

  const frodoAvatar = document.querySelector('[data-avatar_name="frodo"]');
  const gandalfAvatar = document.querySelector('[data-avatar_name="gandalf"]');
  const aragornAvatar = document.querySelector('[data-avatar_name="aragorn"]');
  const legolasAvatar = document.querySelector('[data-avatar_name="legolas"]');

  if (popupClickHandler) {
    popup.removeEventListener('click', popupClickHandler);
  }
  if (frodoClickHandler) {
    frodoAvatar.removeEventListener('click', frodoClickHandler);
  }
  if (gandalfAvatarClickHandler) {
    gandalfAvatar.removeEventListener('click', gandalfAvatarClickHandler);
  }
  if (aragornAvatarClickHandler) {
    aragornAvatar.removeEventListener('click', aragornAvatarClickHandler);
  }
  if (legolasAvatarClickHandler) {
    legolasAvatar.removeEventListener('click', legolasAvatarClickHandler);
  }

  popupClickHandler = (e) => {
    const el = e.target;
    if (!el.closest('.popup__container')) {
      closePopup(parentElement);
      if (parentElement === '[data-popup="results"]') {
        gameState.player.health = gameState.player.maxHealth;
        initBattle();
        cleanBattleLogsHTML();
        saveGameState();
      }
    }

    if (el.closest('.popup__close')) {
      closePopup(parentElement);
      if (parentElement === '[data-popup="results"]') {
        gameState.player.health = gameState.player.maxHealth;
        initBattle();
        cleanBattleLogsHTML();
        saveGameState();
      }
    }
  };

  frodoClickHandler = (e) => {
    gameState.player.avatar = frodoAvatarImg;
    initCharacter();
    saveGameState();
  };

  gandalfAvatarClickHandler = (e) => {
    gameState.player.avatar = gandalfAvatarImg;
    initCharacter();
    saveGameState();
  };

  aragornAvatarClickHandler = (e) => {
    gameState.player.avatar = aragornAvatarImg;
    initCharacter();
    saveGameState();
  };

  legolasAvatarClickHandler = (e) => {
    gameState.player.avatar = legolasAvatarImg;
    initCharacter();
    saveGameState();
  };

  popup.addEventListener('click', popupClickHandler);

  frodoAvatar.addEventListener('click', frodoClickHandler);

  gandalfAvatar.addEventListener('click', gandalfAvatarClickHandler);

  aragornAvatar.addEventListener('click', aragornAvatarClickHandler);

  legolasAvatar.addEventListener('click', legolasAvatarClickHandler);

  // RESULTS POPUP
  const newFightResultsBtn = document.querySelector(
    '[data-popup_results_btn_fight]',
  );
  const changeCharacterResultsBtn = document.querySelector(
    '[data-popup_results_btn_character]',
  );

  if (newFightResultsBtnHandler) {
    newFightResultsBtn.removeEventListener('click', newFightResultsBtnHandler);
  }

  if (changeCharacterResultsBtnHandler) {
    changeCharacterResultsBtn.removeEventListener(
      'click',
      changeCharacterResultsBtnHandler,
    );
  }

  const registerScreenEl = document.querySelector('[data-screen="register"]');
  const homeScreenEl = document.querySelector('[data-screen="home"]');
  const characterScreenEl = document.querySelector('[data-screen="character"]');
  const settingsScreenEl = document.querySelector('[data-screen="settings"]');
  const battleScreenEl = document.querySelector('[data-screen="battle"]');

  const screens = {
    register: registerScreenEl,
    home: homeScreenEl,
    character: characterScreenEl,
    settings: settingsScreenEl,
    battle: battleScreenEl,
  };

  changeCharacterResultsBtnHandler = (e) => {
    gameState.player.health = gameState.player.maxHealth;
    closePopup('[data-popup="results"');
    initBattle();
    cleanBattleLogsHTML();
    initCharacter();
    switchScreen('character', screens);
    saveGameState();
  };

  newFightResultsBtnHandler = (e) => {
    gameState.player.health = gameState.player.maxHealth;
    closePopup('[data-popup="results"');
    initBattle();
    cleanBattleLogsHTML();
    saveGameState();
  };

  newFightResultsBtn.addEventListener('click', newFightResultsBtnHandler);
  changeCharacterResultsBtn.addEventListener(
    'click',
    changeCharacterResultsBtnHandler,
  );
}

export function closePopup(parentElement) {
  const popup = document.querySelector(parentElement);
  const popupContainer = popup.querySelector('[data-popup_container]');

  const popupShowAnimation = [{ opacity: '1' }, { opacity: '0' }];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  const animate = popupContainer.animate(popupShowAnimation, popupTiming);

  animate.addEventListener('finish', () => {
    popup.classList.remove('popup--active');
  });
}
