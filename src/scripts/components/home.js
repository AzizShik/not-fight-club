import { gameState } from '../state';

export function initHome() {
  const homeTitleName = document.querySelector('[data-home_title_name]');
  homeTitleName.textContent = gameState.player.name;
}
