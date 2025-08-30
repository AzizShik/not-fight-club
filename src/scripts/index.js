import '../styles/main.scss';
import { loadGameState } from './storage';
import { initScreens } from './screens';

window.addEventListener('DOMContentLoaded', () => {
  loadGameState();
  initScreens();
});
