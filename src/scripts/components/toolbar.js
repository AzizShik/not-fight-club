import { router } from '../router';
import { capitalazeFirstLetter } from '../utils/capitalaze';

export async function initToolbar() {
  const dataLinks = document.querySelectorAll('[data-link]');

  dataLinks.forEach((link) => {
    const path = link.dataset.link;

    link.addEventListener('click', async (e) => {
      await router(e);

      const title = link.dataset.page_btn;

      const tollbarPageTitle = document.querySelector('[data-page_title]');
      tollbarPageTitle.textContent = capitalazeFirstLetter(title);
    });
  });
}
