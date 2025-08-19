import { showPopup } from './popup';

export function initCharacter() {
  const editContainer = document.querySelector(
    '[data-character_edit_container]',
  );
  const characterAvatar = document.querySelector('[data-character_avatar]');

  const CONTAINER_ACTIVE_CLASS = 'character__avatar-edit-container--active';

  characterAvatar.addEventListener('mouseover', () => {
    editContainer.classList.add(CONTAINER_ACTIVE_CLASS);
  });

  characterAvatar.addEventListener('mouseout', () => {
    editContainer.classList.remove(CONTAINER_ACTIVE_CLASS);
  });

  editContainer.addEventListener('click', () => {
    showPopup();
  });
}
