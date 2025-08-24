import { router } from '../router';
import { showScreen } from '../screens';
import { gameState } from '../state';
import { saveGameState } from '../storage';
import { initHome } from './home';
import { initToolbar } from './toolbar';

let registerBtnHandler;
let registerInputHandler;

export async function initRegister() {
  const registerBtn = document.querySelector('[data-register_btn]');
  const registerInput = document.querySelector('[data-register_input]');

  if (registerBtnHandler && registerBtn) {
    registerBtn.removeEventListener('click', registerBtnHandler);
  }
  if (registerInputHandler && registerInput) {
    registerInput.removeEventListener('input', registerInputHandler);
  }

  registerBtnHandler = async (e) => {
    gameState.player.name = registerInput.value;
    saveGameState();
    await router(e);
    await initHome();
    await initToolbar();
    // await showScreen('/views/home.html');
    // switchScreen('home', screens);
  };

  registerInputHandler = (e) => {
    if (e.target.value.length >= 1) {
      registerBtn.disabled = false;
    } else {
      registerBtn.disabled = true;
    }
  };

  if (registerBtn && registerInput) {
    registerBtn.addEventListener('click', registerBtnHandler);
    registerInput.addEventListener('input', registerInputHandler);
  }
}
