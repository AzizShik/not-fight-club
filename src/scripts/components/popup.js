export function showPopup() {
  const body = document.querySelector('body');
  const popup = document.querySelector('[data-popup]');
  const popupContainer = document.querySelector('[data-popup_container]');

  const popupShowAnimation = [
    { opacity: '0', transform: 'translateX(-100%)' },
    { opacity: '1', transform: 'translateX(0%)' },
  ];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  popupContainer.animate(popupShowAnimation, popupTiming);
  popup.classList.add('popup--active');
  body.classList.add('lock');

  popup.addEventListener('click', (e) => {
    const el = e.target;
    if (!el.closest('.popup__container')) {
      closePopup();
    }

    if (el.closest('.popup__close')) {
      closePopup();
    }
  });
}

export function closePopup() {
  console.log('works');
  const popup = document.querySelector('[data-popup]');
  const popupContainer = document.querySelector('[data-popup_container]');

  const popupShowAnimation = [
    { opacity: '1', transform: 'translateX(0%)' },
    { opacity: '0', transform: 'translateX(-100%)' },
  ];

  const popupTiming = {
    duration: 400,
    fill: 'forwards',
  };

  const animate = popupContainer.animate(popupShowAnimation, popupTiming);

  animate.addEventListener('finish', () => {
    popup.classList.remove('popup--active');
  });
}
