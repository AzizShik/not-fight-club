import { gameState } from '../state';

import frodoAvatarImg from '../../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../../assets/images/character_legolas.jpg';
import { saveGameState } from '../storage';
import { initCharacter } from './character';
import { initBattle, cleanBattleLog } from './battle';
import { addToScreen, showScreen, switchScreen } from '../screens';
import { initToolbar } from './toolbar';
import { initBurger } from './burger';

let popupClickHandler = null;
let frodoClickHandler = null;
let gandalfAvatarClickHandler = null;
let aragornAvatarClickHandler = null;
let legolasAvatarClickHandler = null;
let newFightResultsBtnHandler = null;
let changeCharacterResultsBtnHandler = null;

export async function showPopup(parentElement) {
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
  if (frodoClickHandler && frodoAvatar) {
    frodoAvatar.removeEventListener('click', frodoClickHandler);
  }
  if (gandalfAvatarClickHandler && gandalfAvatar) {
    gandalfAvatar.removeEventListener('click', gandalfAvatarClickHandler);
  }
  if (aragornAvatarClickHandler && aragornAvatar) {
    aragornAvatar.removeEventListener('click', aragornAvatarClickHandler);
  }
  if (legolasAvatarClickHandler && legolasAvatar) {
    legolasAvatar.removeEventListener('click', legolasAvatarClickHandler);
  }

  popupClickHandler = (e) => {
    const el = e.target;
    if (!el.closest('.popup__container')) {
      closePopup(parentElement);

      if (parentElement === '[data-popup="results"]') {
        cleanBattleLog();
        initBattle();
        saveGameState();
      }
    }

    if (el.closest('.popup__close')) {
      closePopup(parentElement);

      if (parentElement === '[data-popup="results"]') {
        cleanBattleLog();
        initBattle();
        saveGameState();
      }
    }
  };

  frodoClickHandler = (e) => {
    gameState.player.avatar = frodoAvatarImg;
    updateAvatar('frodo');
    initCharacter();
    saveGameState();
    closePopup('[data-popup="character_change"]');
  };

  gandalfAvatarClickHandler = (e) => {
    gameState.player.avatar = gandalfAvatarImg;
    updateAvatar('gandalf');
    initCharacter();
    saveGameState();
    closePopup('[data-popup="character_change"]');
  };

  aragornAvatarClickHandler = (e) => {
    gameState.player.avatar = aragornAvatarImg;
    updateAvatar('aragorn');
    initCharacter();
    saveGameState();
    closePopup('[data-popup="character_change"]');
  };

  legolasAvatarClickHandler = (e) => {
    gameState.player.avatar = legolasAvatarImg;
    updateAvatar('legolas');
    initCharacter();
    saveGameState();
    closePopup('[data-popup="character_change"]');
  };

  popup.addEventListener('click', popupClickHandler);

  if (frodoAvatar && gandalfAvatar && aragornAvatar && legolasAvatar) {
    frodoAvatar.addEventListener('click', frodoClickHandler);
    gandalfAvatar.addEventListener('click', gandalfAvatarClickHandler);
    aragornAvatar.addEventListener('click', aragornAvatarClickHandler);
    legolasAvatar.addEventListener('click', legolasAvatarClickHandler);
  }

  // RESULTS POPUP
  const newFightResultsBtn = document.querySelector(
    '[data-popup_results_btn_fight]',
  );

  const changeCharacterResultsBtn = document.querySelector(
    '[data-popup_results_btn_character]',
  );

  if (newFightResultsBtnHandler && newFightResultsBtn) {
    newFightResultsBtn.removeEventListener('click', newFightResultsBtnHandler);
  }

  if (changeCharacterResultsBtnHandler && changeCharacterResultsBtn) {
    changeCharacterResultsBtn.removeEventListener(
      'click',
      changeCharacterResultsBtnHandler,
    );
  }

  changeCharacterResultsBtnHandler = async (e) => {
    closePopup('[data-popup="results"');
    cleanBattleLog();
    initBattle();
    await showScreen('./views/character.html');
    await addToScreen('./views/toolbar.html');
    initCharacter();
    saveGameState();
  };

  newFightResultsBtnHandler = (e) => {
    closePopup('[data-popup="results"');
    cleanBattleLog();
    initBattle();
    saveGameState();
  };

  if (newFightResultsBtn && changeCharacterResultsBtn) {
    newFightResultsBtn.addEventListener('click', newFightResultsBtnHandler);
    changeCharacterResultsBtn.addEventListener(
      'click',
      changeCharacterResultsBtnHandler,
    );
  }
}

export function closePopup(parentElement) {
  const popup = document.querySelector(parentElement);
  const popupContainer = popup.querySelector('[data-popup_container]');
  const body = document.querySelector('body');

  const popupShowAnimation = [{ opacity: '1' }, { opacity: '0' }];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  const animate = popupContainer.animate(popupShowAnimation, popupTiming);
  const isCharacterView = document.querySelector(
    '[data-popup="character_change"]',
  );

  animate.addEventListener('finish', () => {
    body.classList.remove('lock');
    popup.classList.remove('popup--active');
    popup.remove();
    if (isCharacterView) {
      initCharacter();
    }
    initBurger();
    initToolbar();
  });
}

export function updateAvatar(avatarName) {
  const avatarObj = gameState.avatars.find(
    (item) => item.avatarName === avatarName,
  );

  gameState.player.attack = avatarObj.attack;
  gameState.player.attackZones = avatarObj.attackZones;
  gameState.player.defendZones = avatarObj.defendZones;
  gameState.player.critChance = avatarObj.critChance;
  gameState.player.critMultiplier = avatarObj.critMultiplier;
  gameState.player.maxHealth = avatarObj.maxHealth;
  gameState.player.health = avatarObj.health;

  saveGameState();
}
