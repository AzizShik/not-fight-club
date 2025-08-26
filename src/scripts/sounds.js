import clickSoundUrl from '../assets/sounds/click.mp3';
import fightSoundUrl from '../assets/sounds/fight.mp3';

export function createSound(src, volume = 0.1) {
  const sound = new Audio();
  sound.src = src;
  sound.volume = volume;

  return sound;
}

export function addSoundsToButtons(volume = 0.1) {
  const dataSounds = document.querySelectorAll('[data-sound]');

  const clickSound = createSound(clickSoundUrl, volume);
  const fightSound = createSound(fightSoundUrl, volume);

  dataSounds.forEach((el) => {
    const soundName = el.dataset.sound;

    el.addEventListener('click', (e) => {
      if (soundName === 'click') {
        clickSound.play();
      }

      if (soundName === 'fight') {
        fightSound.play();
      }
    });
  });
}

import importBgSongUrl from '../assets/sounds/song.mp3';

let backgroundMusic = null;
let userInteracted = false;

export function initBackgroundMusic(newVolume = 0.025) {
  if (!backgroundMusic) {
    const bgSongUrl = importBgSongUrl;
    backgroundMusic = createSound(bgSongUrl, newVolume);
    backgroundMusic.loop = true;
  }
}

export function playBackgroundMusic() {
  if (backgroundMusic && userInteracted) {
    backgroundMusic.play();
  }
}

export function changeVolumeBackgroundMusic(newVolume) {
  if (backgroundMusic && userInteracted) {
    backgroundMusic.volume = newVolume;
  }
}

export function pauseBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.pause();
  }
}

export function setUserInteracted() {
  userInteracted = true;
  playBackgroundMusic();
}
