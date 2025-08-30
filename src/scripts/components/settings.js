import { gameState } from '../state';
import { saveGameState } from '../storage';

let editNameHandler = null;
let inputHandler = null;

export function initSettings() {
  const settingsChangeName = document.querySelector(
    '[data-settings_change_name]',
  );
  const editNameBtn = document.querySelector('[data-edit_change_name]');
  const changeNameInput = document.querySelector(
    '[data-settings_change_name_input]',
  );
  const currentNameSpan = document.querySelector(
    '[data-settings_change-name_current_name]',
  );

  currentNameSpan.textContent = gameState.player.name;
  let currentPlayerName = gameState.player.name;

  if (editNameHandler) {
    editNameBtn.removeEventListener('click', editNameHandler);
    settingsChangeName.classList.remove('settings__change-name--active');
    editNameBtn.textContent = 'Edit';
    currentNameSpan.textContent = currentPlayerName;
  }
  if (inputHandler) {
    changeNameInput.removeEventListener('input', inputHandler);
  }

  editNameHandler = (e) => {
    editChangeInput();
    gameState.player.name = changeNameInput.value.trim();
    saveGameState();
  };

  inputHandler = (e) => {
    const input = e.target;

    if (!input.value) {
      editNameBtn.disabled = true;
    } else {
      editNameBtn.disabled = false;
      currentPlayerName = input.value.trim();
    }
  };

  editNameBtn.addEventListener('click', editNameHandler);
  changeNameInput.addEventListener('input', inputHandler);

  function editChangeInput() {
    if (
      !settingsChangeName.classList.contains('settings__change-name--active')
    ) {
      settingsChangeName.classList.add('settings__change-name--active');
      editNameBtn.textContent = 'Save';
      changeNameInput.value = currentPlayerName;
    } else {
      settingsChangeName.classList.remove('settings__change-name--active');
      editNameBtn.textContent = 'Edit';
      currentNameSpan.textContent = currentPlayerName;
    }
  }
}

export function cleanupSettings() {
  const editNameBtn = document.querySelector('[data-edit_change_name]');
  const changeNameInput = document.querySelector(
    '[data-settings_change_name_input]',
  );
  const currentNameSpan = document.querySelector(
    '[data-settings_change-name_current_name]',
  );
  const settingsChangeName = document.querySelector(
    '[data-settings_change_name]',
  );

  if (editNameHandler && editNameBtn) {
    editNameBtn.removeEventListener('click', editNameHandler);
  }
  if (inputHandler && changeNameInput) {
    changeNameInput.removeEventListener('input', inputHandler);
  }

  settingsChangeName.classList.remove('settings__change-name--active');
  editNameBtn.textContent = 'Edit';
  currentNameSpan.textContent = currentPlayerName;

  editNameHandler = null;
  inputHandler = null;
}
