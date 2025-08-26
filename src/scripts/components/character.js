import { gameState } from '../state';
import { showPopup } from './popup';

import frodoAvatarImg from '../../assets/images/character_frodo.jpg';
import gandalfAvatarImg from '../../assets/images/character_gandalf.jpg';
import aragornAvatarImg from '../../assets/images/character_aragorn.jpg';
import legolasAvatarImg from '../../assets/images/character_legolas.jpg';
import { addToScreen } from '../screens';
import { addSoundsToButtons } from '../sounds';

const avatars = {
  frodo: frodoAvatarImg,
  gandalf: gandalfAvatarImg,
  aragorn: aragornAvatarImg,
  legolas: legolasAvatarImg,
};

let characterAvatarMouseOverHandler = null;
let characterAvatarMouseOutHandler = null;
let editContainerHandler = null;
let characterAvatarBtnHandler = null;

export function initCharacter() {
  const popupParent = document.querySelector('[data-popup="character_change"]');

  const editContainer = document.querySelector(
    '[data-character_edit_container]',
  );
  const characterAvatar = document.querySelector('[data-character_avatar]');
  const characterAvatarBtn = document.querySelector(
    '[data-character_avatar_btn]',
  );

  const characterAvatarImg = document.querySelector(
    '[data-character_avatar_img]',
  );
  const characterName = document.querySelector('[data-character_name]');
  const characterWins = document.querySelector('[data-result_wins]');
  const characterLoses = document.querySelector('[data-result_loses]');

  characterAvatarImg.src = gameState.player.avatar;
  characterName.textContent = gameState.player.name;
  characterWins.textContent = gameState.player.wins;
  characterLoses.textContent = gameState.player.loses;

  const CONTAINER_ACTIVE_CLASS = 'character__avatar-edit-container--active';
  editContainer.classList.remove(CONTAINER_ACTIVE_CLASS);

  if (characterAvatarMouseOverHandler) {
    characterAvatar.removeEventListener(
      'mouseover',
      characterAvatarMouseOverHandler,
    );
  }
  if (characterAvatarMouseOutHandler) {
    characterAvatar.removeEventListener(
      'mouseout',
      characterAvatarMouseOutHandler,
    );
  }
  if (editContainerHandler) {
    editContainer.removeEventListener('click', editContainerHandler);
  }
  if (characterAvatarBtnHandler) {
    characterAvatarBtn.removeEventListener('click', characterAvatarBtnHandler);
  }

  characterAvatarMouseOverHandler = (e) => {
    editContainer.classList.add(CONTAINER_ACTIVE_CLASS);
  };

  characterAvatarMouseOutHandler = (e) => {
    editContainer.classList.remove(CONTAINER_ACTIVE_CLASS);
  };

  editContainerHandler = async (e) => {
    await addToScreen('./views/popup_character.html');
    await showPopup('[data-popup="character_change"]');
  };

  characterAvatarBtnHandler = async (e) => {
    await addToScreen('./views/popup_character.html');
    await showPopup('[data-popup="character_change"]');
  };

  characterAvatar.addEventListener(
    'mouseover',
    characterAvatarMouseOverHandler,
  );
  characterAvatar.addEventListener('mouseout', characterAvatarMouseOutHandler);

  editContainer.addEventListener('click', editContainerHandler);

  characterAvatarBtn.addEventListener('click', characterAvatarBtnHandler);
}
