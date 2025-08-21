import { gameState } from '../state';

import frodoAvatarImg from '../../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../../assets/images/character_legolas.jpg';
import { saveGameState } from '../storage';
import { initCharacter } from './character';

let popupClickHandler = null;
let frodoClickHandler = null;
let gandalfAvatarClickHandler = null;
let aragornAvatarClickHandler = null;
let legolasAvatarClickHandler = null;

export function showPopup() {
  const body = document.querySelector('body');
  const popup = document.querySelector('[data-popup]');
  const popupContainer = document.querySelector('[data-popup_container]');

  const popupShowAnimation = [
    { opacity: '0', transform: 'translateX(-100%)' },
    { opacity: '1', transform: 'translateX(0%)' },
  ];

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
      closePopup();
    }

    if (el.closest('.popup__close')) {
      closePopup();
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
}

export function closePopup() {
  console.log('works');
  const popup = document.querySelector('[data-popup]');
  const popupContainer = document.querySelector('[data-popup_container]');

  const popupShowAnimation = [
    { opacity: '1', transform: 'translateX(0%)' },
    { opacity: '0', transform: 'translateX(-100%)' },
  ];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  const animate = popupContainer.animate(popupShowAnimation, popupTiming);

  animate.addEventListener('finish', () => {
    popup.classList.remove('popup--active');
  });
}
