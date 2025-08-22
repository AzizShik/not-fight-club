import { gameState } from '../state';

let battleZoneAttackClickHandler = null;
let battleZoneDefenceClickHandler = null;

let battleAttackBtnHandler = null;

export function initBattle() {
  if (gameState.enemy.name) {
    //
  }

  const randomIndex = Math.floor(Math.random() * gameState.enemies.length);
  gameState.enemy = JSON.parse(JSON.stringify(gameState.enemies[randomIndex]));

  const characterAvatarImg = document.querySelector(
    '[data-battle_character_avatar_img]',
  );
  const characterName = document.querySelector('[data-battle_character_name]');
  const characterHealth = document.querySelector(
    '[data-battle_character_current_health]',
  );
  const characterTotalHealth = document.querySelector(
    '[data-battle_character_total_health]',
  );

  characterAvatarImg.src = gameState.player.avatar;
  characterName.textContent = gameState.player.name;
  characterHealth.textContent = gameState.player.health;
  characterTotalHealth.textContent = gameState.player.maxHealth;

  const enemyAvatarImg = document.querySelector(
    '[data-battle_enemy_avatar_img]',
  );
  const enemyName = document.querySelector('[data-battle_enemy_name]');
  const enemyCurrentHealth = document.querySelector(
    '[data-battle_enemy_current_health]',
  );
  const enemyTotalHealth = document.querySelector(
    '[data-battle_enemy_total_health]',
  );

  enemyAvatarImg.src = gameState.enemy.avatar;
  enemyName.textContent = gameState.enemy.name;
  enemyCurrentHealth.textContent = gameState.enemy.health;
  enemyTotalHealth.textContent = gameState.enemy.maxHealth;

  const battleAttackBtn = document.querySelector(
    '[data-battle_controls_attack_btn]',
  );

  battleAttackBtn.disabled = true;

  const battleZoneAttack = document.querySelector('[data-battle_zone_attack]');
  const battleZoneDefence = document.querySelector(
    '[data-battle_zone_defence]',
  );

  if (battleZoneAttackClickHandler) {
    battleZoneAttack.removeEventListener('click', battleZoneAttackClickHandler);
  }

  if (battleZoneDefenceClickHandler) {
    battleZoneDefence.removeEventListener(
      'click',
      battleZoneDefenceClickHandler,
    );
  }

  const attackMaxEl = document.querySelector('[data-battle_zone_attack_max]');
  const attackMaxSelect = parseInt(
    attackMaxEl.dataset.battle_zone_attack_max,
    10,
  );

  let attackSelectedCheboxesArr = [];

  battleZoneAttackClickHandler = (e) => {
    const el = e.target;

    if (el.tagName === 'LABEL') return;

    const selectedCheckboxes =
      battleZoneAttack.querySelectorAll('input:checked').length;

    if (el.closest('[data-battle_zone_attack_radio]')) {
      if (el.checked && attackSelectedCheboxesArr.length < attackMaxSelect) {
        attackSelectedCheboxesArr.push(el);
      }

      if (!el.checked) {
        el.checked = false;
        attackSelectedCheboxesArr = attackSelectedCheboxesArr.filter(
          (e) => e != el,
        );
      }

      if (selectedCheckboxes > attackMaxSelect) {
        const lastAttackSelect = attackSelectedCheboxesArr.shift();
        lastAttackSelect.checked = false;
        attackSelectedCheboxesArr.push(el);
      }
    }

    updateBattleBtnState();
  };

  const defenceMaxEl = document.querySelector('[data-battle_zone_defence_max]');
  const defenceMaxSelect = parseInt(
    defenceMaxEl.dataset.battle_zone_defence_max,
    10,
  );

  let defenceSelectedCheboxesArr = [];

  battleZoneDefenceClickHandler = (e) => {
    const el = e.target;

    if (el.tagName === 'LABEL') return;

    const selectedCheckboxes =
      battleZoneDefence.querySelectorAll('input:checked').length;

    if (el.closest('[data-battle_zone_defence_radio]')) {
      if (el.checked && defenceSelectedCheboxesArr.length < defenceMaxSelect) {
        defenceSelectedCheboxesArr.push(el);
      }

      if (!el.checked) {
        el.checked = false;
        defenceSelectedCheboxesArr = defenceSelectedCheboxesArr.filter(
          (e) => e != el,
        );
      }

      if (selectedCheckboxes > defenceMaxSelect) {
        const lastAttackSelect = defenceSelectedCheboxesArr.shift();
        lastAttackSelect.checked = false;
        defenceSelectedCheboxesArr.push(el);
      }
    }

    updateBattleBtnState();
  };

  function updateBattleBtnState() {
    if (
      (attackMaxSelect === attackSelectedCheboxesArr.length) &
      (defenceMaxSelect === defenceSelectedCheboxesArr.length)
    ) {
      battleAttackBtn.disabled = false;
    } else {
      battleAttackBtn.disabled = true;
    }
  }

  battleZoneAttack.addEventListener('click', battleZoneAttackClickHandler);
  battleZoneDefence.addEventListener('click', battleZoneDefenceClickHandler);

  if (battleAttackBtnHandler) {
    battleAttackBtn.removeEvenetListener('click', battleAttackBtnHandler);
  }

  battleAttackBtnHandler = (e) => {
    
  };

  battleAttackBtn.addEventListener('click', battleAttackBtnHandler);
}
