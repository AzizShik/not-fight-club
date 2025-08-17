export function initRegister() {
  const registerBtn = document.querySelector('[data-register-btn]');
  const registerInput = document.querySelector('[data-register-input]');

  registerBtn.addEventListener('click', () => {
    registerPlayer();
  });

  registerInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 1) {
      registerBtn.disabled = false;
    } else {
      registerBtn.disabled = true;
    }
  });

  function registerPlayer() {
    const gameState = {
      player: {
        name: registerInput.value,
      },
    };
    localStorage.setItem('notFightClubGame', JSON.stringify(gameState));
  }

  console.log('register');
}
