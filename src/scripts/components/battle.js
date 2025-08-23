import { gameState } from '../state';
import { loadGameState, saveGameState } from '../storage';

let battleZoneAttackClickHandler = null;
let battleZoneDefenceClickHandler = null;

let battleAttackBtnHandler = null;

export function initBattle() {
  if (gameState.enemy.name) {
    //
  }

  const randomIndex = Math.floor(Math.random() * gameState.enemies.length);
  gameState.enemy = JSON.parse(JSON.stringify(gameState.enemies[randomIndex]));

  updateBattleScreen();

  const battleAttackBtn = document.querySelector(
    '[data-battle_controls_attack_btn]',
  );
  battleAttackBtn.disabled = true;

  const battleZoneAttack = document.querySelector('[data-battle_zone_attack]');
  const battleZoneDefence = document.querySelector(
    '[data-battle_zone_defence]',
  );

  const battleZoneAttackInputs = battleZoneAttack.querySelectorAll('input');
  const battleZoneDefenceInputs = battleZoneDefence.querySelectorAll('input');

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
  // const attackMaxSelect = parseInt(
  //   attackMaxEl.dataset.battle_zone_attack_max,
  //   10,
  // );

  const attackMaxSelect = gameState.player.attackZones;

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
  // const defenceMaxSelect = parseInt(
  //   defenceMaxEl.dataset.battle_zone_defence_max,
  //   10,
  // );

  const defenceMaxSelect = gameState.player.defendZones;

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

  function resetBattleZones() {
    battleZoneAttackInputs.forEach((input) => {
      input.checked = false;
    });
    battleZoneDefenceInputs.forEach((input) => {
      input.checked = false;
    });

    attackSelectedCheboxesArr = [];
    defenceSelectedCheboxesArr = [];

    // gameState.battle.playerAttack = [];
    // gameState.battle.playerDefend = [];
    // gameState.battle.enemyAttack = [];
    // gameState.battle.enemyDefend = [];

    // saveGameState();

    battleAttackBtn.disabled = true;
  }

  battleZoneAttack.addEventListener('click', battleZoneAttackClickHandler);
  battleZoneDefence.addEventListener('click', battleZoneDefenceClickHandler);

  if (battleAttackBtnHandler) {
    battleAttackBtn.removeEvenetListener('click', battleAttackBtnHandler);
  }

  battleAttackBtnHandler = (e) => {
    let attackZonesArr = [];
    let defenceZonesArr = [];

    attackSelectedCheboxesArr.forEach((input) => {
      attackZonesArr.push(input.dataset.battle_zone_attack_input);
    });

    defenceSelectedCheboxesArr.forEach((input) => {
      defenceZonesArr.push(input.dataset.battle_zone_defence_input);
    });

    // console.log(attackZonesArr);
    // console.log(defenceZonesArr);

    gameState.battle.playerAttack.push(...attackZonesArr);
    gameState.battle.playerDefend.push(...defenceZonesArr);
    // console.log(gameState.battle.playerAttack);
    // console.log(gameState.battle.playerDefend);

    chooseEnemyAttackZones();
    chooseEnemyDefendZones();
    saveGameState();

    calculateResults();

    resetBattleZones();
  };

  battleAttackBtn.addEventListener('click', battleAttackBtnHandler);

  const allZonesArr = ['head', 'neck', 'body', 'belly', 'legs'];

  function chooseEnemyAttackZones() {
    for (
      let i = 0;
      gameState.battle.enemyAttack.length < gameState.enemy.attackZones;
      i++
    ) {
      const randomIdx = Math.floor(Math.random() * allZonesArr.length);

      if (!gameState.battle.enemyAttack.includes(allZonesArr[randomIdx])) {
        gameState.battle.enemyAttack.push(allZonesArr[randomIdx]);
      }
    }
  }

  function chooseEnemyDefendZones() {
    for (
      let i = 0;
      gameState.battle.enemyDefend.length < gameState.enemy.defendZones;
      i++
    ) {
      const randomIdx = Math.floor(Math.random() * allZonesArr.length);

      if (!gameState.battle.enemyDefend.includes(allZonesArr[randomIdx])) {
        gameState.battle.enemyDefend.push(allZonesArr[randomIdx]);
      }
    }
  }

  const battleLogEl = document.querySelector('[data-battle_log]');

  // chooseEnemyAttackZones();
  // chooseEnemyDefendZones();

  function calculateResults() {
    // playerAttackResults();
    // enemyAttackResults();

    attackResults('player');
    attackResults('enemy');
    // playerDefendResults();

    // console.log(gameState.battle.playerAttack);
    // console.log(gameState.battle.playerDefend);
    // console.log(gameState.battle.enemyAttack);
    // console.log(gameState.battle.enemyDefend);
  }

  function attackResults(character) {
    let characterAttack;
    let characterDefend;

    if (character === 'player') {
      characterAttack = 'player';
      characterDefend = 'enemy';
    } else if (character === 'enemy') {
      characterAttack = 'enemy';
      characterDefend = 'player';
    }

    const characterAttackStr = characterAttack + 'Attack';

    const attackArr = gameState.battle[characterAttackStr];
    console.log(attackArr);
    attackArr.forEach((attack) => {
      const isCritical = isAttackCritical();
      const damage = isCritical
        ? Math.floor(
            gameState[characterAttack].attack *
              gameState[characterAttack].critMultiplier,
          )
        : gameState[characterAttack].attack;

      const isCharacterAttacking = characterAttack === 'player' ? true : false;

      const attackingCharacterSpan = isCharacterAttacking
        ? 'character'
        : 'enemy';
      const defendingCharacterSpan = isCharacterAttacking
        ? 'enemy'
        : 'character';

      const attackObj = {
        attackerName: gameState[characterAttack].name,
        defenderName: gameState[characterDefend].name,
        attackZone: attack,
        isCrit: isCritical,
        damage: damage,
        isBlocked: false,
        attackingCharacterSpan: attackingCharacterSpan,
        defendingCharacterSpan: attackingCharacterSpan,
        characterAttack: characterAttack,
        characterDefend: characterDefend,
      };

      if (isCritical && gameState.battle.enemyDefend.includes(attack)) {
        attackObj.isBlocked = true;
        createAttackLog(attackObj);
      } else if (!gameState.battle.enemyDefend.includes(attack)) {
        createAttackLog(attackObj);
      } else {
        createDefendLog(attackObj);
      }
    });
  }

  function createAttackLog(attackObj) {
    const { damage, characterDefend } = attackObj;

    const logItem = document.createElement('div');
    logItem.classList.add('battle__log-item');
    logItem.innerHTML = attackItemLogHTML(attackObj);

    updateBattleHealth(characterDefend, damage);

    battleLogEl.append(logItem);
    battleLogEl.scrollTop = battleLogEl.scrollHeight;
  }

  function updateBattleHealth(character, damage) {
    gameState[character].health = gameState[character].health - damage;
    updateBattleScreen();
  }

  function createDefendLog(attackObj) {
    const { attackerName, defenderName, attackZone } = attackObj;

    const logItem = document.createElement('div');
    logItem.classList.add('battle__log-item');
    logItem.innerHTML = defendItemLogHTML(attackObj);

    battleLogEl.append(logItem);
    battleLogEl.scrollTop = battleLogEl.scrollHeight;
  }

  function attackItemLogHTML(attackObj) {
    const {
      attackerName,
      defenderName,
      attackZone,
      isCrit,
      damage,
      isBlocked,
      attackingCharacterSpan,
      defendingCharacterSpan,
    } = attackObj;

    const attackZoneCapitalized =
      attackZone[0].toUpperCase() + attackZone.slice(1);

    if (isCrit && isBlocked) {
      return `
            <span class="battle__log-item-${attackingCharacterSpan} battle__log-item-span" data-battle_log_character_span>${attackerName}</span>
            attacked
            <span class="battle__log-item-${defendingCharacterSpan} battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            to
            <span class="battle__log-item-zone battle__log-item-span" data-battle_log_zone_span>${attackZoneCapitalized}</span>
            <span class="battle__log-item-${defendingCharacterSpan} battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            tried to block but <span class="battle__log-item-${attackingCharacterSpan} battle__log-item-span" data-battle_log_character_span>${attackerName}</span> was very lucky and crit his opponent for <span class="battle__log-item-damage battle__log-item-span" data-battle_log_zone_span>${damage} damage</span>
    `;
    } else if (isCrit) {
      return `
            <span class="battle__log-item-${attackingCharacterSpan} battle__log-item-span" data-battle_log_character_span>${attackerName}</span>
            attacked
            <span class="battle__log-item-${defendingCharacterSpan} battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            to
            <span class="battle__log-item-zone battle__log-item-span" data-battle_log_zone_span>${attackZoneCapitalized}</span>
            and crit
            <span class="battle__log-item-damage battle__log-item-span" data-battle_log_zone_span>${damage} damage</span>
    `;
    } else {
      return `
            <span class="battle__log-item-${attackingCharacterSpan} battle__log-item-span" data-battle_log_character_span>${attackerName}</span>
            attacked
            <span class="battle__log-item-${defendingCharacterSpan} battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            to
            <span class="battle__log-item-zone battle__log-item-span" data-battle_log_zone_span>${attackZoneCapitalized}</span>
            and deal
            <span class="battle__log-item-damage battle__log-item-span" data-battle_log_zone_span>${damage} damage</span>
    `;
    }
  }

  function defendItemLogHTML(attackObj) {
    const {
      attackerName,
      defenderName,
      attackZone,
      attackingCharacterSpan,
      defendingCharacterSpan,
    } = attackObj;

    const attackZoneCapitalized =
      attackZone[0].toUpperCase() + attackZone.slice(1);

    return `
            <span class="battle__log-item-${attackingCharacterSpan} battle__log-item-span" data-battle_log_character_span>${attackerName}</span>
            attacked
            <span class="battle__log-item-${defendingCharacterSpan} battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            to
            <span class="battle__log-item-zone battle__log-item-span" data-battle_log_zone_span>${attackZoneCapitalized}</span>
            but <span class="battle__log-item-enemy battle__log-item-span" data-battle_log_enemy_span>${defenderName}</span>
            was able to <span class="battle__log-item-defend battle__log-item-span" data-battle_log_protect_span>protect</span>
            his  <span class="battle__log-item-zone battle__log-item-span" data-battle_log_zone_span>${attackZoneCapitalized}</span>
    `;
  }

  function isAttackCritical() {
    return gameState.player.critChance > Math.random();
  }

  calculateResults();
}

export function updateBattleScreen() {
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

  const characterHealthBg = document.querySelector('[data-avatar_health_bg]');
  const enemyHealthBg = document.querySelector('[data-enemy_health_bg]');

  characterAvatarImg.src = gameState.player.avatar;
  characterName.textContent = gameState.player.name;
  characterHealth.textContent = gameState.player.health;
  characterTotalHealth.textContent = gameState.player.maxHealth;
  characterHealthBg.style.width = `${
    (gameState.player.health * 100) / gameState.player.maxHealth
  }%`;

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
  enemyHealthBg.style.width = `${
    (gameState.enemy.health * 100) / gameState.enemy.maxHealth
  }%`;
}
