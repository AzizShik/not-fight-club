import { gameState } from './state.js';

export function saveGameState() {
  localStorage.setItem('notFightClubGame', JSON.stringify(gameState));
}

export function loadGameState() {
  const savedState = localStorage.getItem('notFightClubGame');
  if (savedState) {
    const parsed = JSON.parse(savedState);
    Object.assign(gameState, parsed);
  }
}
