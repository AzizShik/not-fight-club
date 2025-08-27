export async function initBurger() {
  const burgerBtn = document.querySelector('[data-toolbar_burger]');
  const toolBarNav = document.querySelector('[data-toolbar_nav]');

  const toolbarLinks = document.querySelectorAll('[data-link]');

  burgerBtn.addEventListener('click', (e) => {
    toolBarNav.classList.toggle('toolbar__right--active');
    burgerBtn.classList.toggle('toolbar-burger--active');
  });
}

export async function closeBurger() {
  const burgerBtn = document.querySelector('[data-toolbar_burger]');
  const toolBarNav = document.querySelector('[data-toolbar_nav]');
  toolBarNav.classList.remove('toolbar__right--active');
  burgerBtn.classList.remove('toolbar-burger--active');
}
