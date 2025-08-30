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
