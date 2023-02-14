const attack = document.querySelector(".attack");
const specialAttack = document.querySelector(".specialAttack");
const heal = document.querySelector(".heal");
const giveUp = document.querySelector(".giveUp");
const playAgain = document.querySelector(".playAgain");
const startNewGame = document.querySelector(".startNewGame");
const Buttons = document.querySelector(".buttons");
const battleLogsParagraph = document.querySelector(".logs");
const monster = document.querySelector(".fillmonster");
const player = document.querySelector(".fillyour");
let consecutiveHeals = 0;
let monsterHealth = 100;
let playerHealth = 100;
monster.style.width = monsterHealth + "%";
player.style.width = playerHealth + "%";

function randomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function randomSpecial() {
  return Math.floor(Math.random() * 40) + 20;
}

attack.addEventListener("click", () => {
  let num1 = randomNumber();
  let num2 = randomNumber();

  battleLogsParagraph.innerHTML += `<p><span style="color:blue">Player</span> Attacks and deals <span style="color:orange">${num2}</span></p>`;
  battleLogsParagraph.innerHTML += `<p><span style="color:orange">Monster</span> Attacks and deals <span style="color:orange">${num1}</span></p>`;
  monster.style.width = parseInt(monster.style.width) - num2 + "%";
  player.style.width = parseInt(player.style.width) - num1 + "%";
  checkWinner();
  consecutiveHeals = 0;
});

specialAttack.addEventListener("click", () => {
  let monsterCurHealth = parseInt(monster.style.width);
  let playerCurHealth = parseInt(player.style.width);

  if (playerCurHealth <= monsterCurHealth + 20) {
    let specialDamage = randomSpecial();
    let monsterHealthNew = monsterCurHealth - specialDamage;
    let playerHealthNew = playerCurHealth - Math.floor(specialDamage / 2);

    monsterHealthNew = Math.max(0, monsterHealthNew);
    playerHealthNew = Math.max(0, playerHealthNew);

    monster.style.width = `${monsterHealthNew}%`;
    player.style.width = `${playerHealthNew}%`;
    battleLogsParagraph.innerHTML += `<p><span style="color:blue">Player</span> special attack <span style="color:orange">Monster</span></p>`;
    checkWinner();
    consecutiveHeals = 0;
  } else {
    alert(
      "Your health must be less than the monster's health by 20% in order to perform a special attack"
    );
  }
});

heal.addEventListener("click", () => {
  let healthOfPlayer = parseInt(player.style.width);

  if (healthOfPlayer >= 100 || consecutiveHeals >= 3) {
    alert("heal used 3 times");
    return;
  }

  let healNum = randomNumber();
  let healthNew = healthOfPlayer + healNum;
  healthNew = Math.min(100, healthNew);

  player.style.width = `${healthNew}%`;

  consecutiveHeals = newHealth === 100 ? 0 : consecutiveHeals + 1;
  battleLogsParagraph.innerHTML += `<p><span style="color:blue">Player</span> Heals <span style="color:orange">${healthNew}</span></p>`;
});

giveUp.addEventListener("click", () => {
  monster.style.width = "100%";
  player.style.width = "0%";
  playAgain.style.display = "block";
  Buttons.style.display = "none";
  document.querySelector(".result").textContent =
    "The monster has won the game.";
});

startNewGame.addEventListener("click", () => {
  player.style.width = "100%";
  monster.style.width = "100%";
  Buttons.style.display = "flex";
  playAgain.style.display = "none";
  consecutiveHeals = 0;
  battleLogsParagraph.innerHTML = ``;
});

function checkWinner() {
  //delete the percentage sign
  let monsterCurrent = parseInt(monster.style.width.slice(0, -1));
  let playerCurrent = parseInt(player.style.width.slice(0, -1));

  if (monsterCurrent <= 0) {
    playAgain.style.display = "block";
    Buttons.style.display = "none";
    document.querySelector(".result").textContent = "You won the game!";
  } else if (playerCurrent <= 0) {
    playAgain.style.display = "block";
    Buttons.style.display = "none";
    document.querySelector(".result").textContent = "Game Over.";
  }
}
