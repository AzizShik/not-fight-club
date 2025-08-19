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

  let currentPlayerName = currentNameSpan.textContent;

  editNameBtn.addEventListener('click', () => {
    editChangeInput();
  });

  changeNameInput.addEventListener('input', (e) => {
    const input = e.target;

    if (!input.value) {
      editNameBtn.disabled = true;
    } else {
      editNameBtn.disabled = false;
      currentPlayerName = input.value;
    }
  });

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
