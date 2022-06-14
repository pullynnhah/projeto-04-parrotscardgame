function setNumberOfCards() {
  numberOfCards = Number(
    prompt(
      `Com quantas cartas deseja jogar?\nEntre um número par no intervalo: [${MIN_CARDS}, ${MAX_CARDS}]`
    )
  );

  if (!isNumberOfCardsValid(numberOfCards)) {
    setNumberOfCards();
  }
}

function isNumberOfCardsValid(n) {
  return !isNaN(n) && n % 2 === 0 && n >= 4 && n <= 14;
}

function createDeck() {
  deck = [];
  for (let i = 0; i < numberOfCards / 2; i++) {
    deck.push(PARROTS[i]);
    deck.push(PARROTS[i]);
  }

  deck.sort(() => Math.random() - 0.5);
}

function createBoard() {
  let cardsHTML = "";
  for (let i = 0; i < numberOfCards; i++) {
    cardsHTML += createCard(deck[i]);
  }

  main.innerHTML = cardsHTML;
}

function createCard(frontImage) {
  return `
  <div class="card" data-identifier="card" onclick="userFlip(this, '${frontImage}')">
    <div class="front face" data-identifier="front-face">
      <img src="images/${frontImage}" alt="parrot gif"/>
    </div>
    
    <div class="back face" data-identifier="back-face">
      <img src="images/back.png" alt="parrot" />
    </div>
  </div>
`;
}

function flip(card) {
  card.classList.toggle("flipped");
}

function userFlip(card, title) {
  if (canBeFlipped(card)) {
    flip(card);
    flipCount++;
    currentPair.push([card, title]);
    console.log(currentPair);
    if (currentPair.length === 2) {
      validatePair();
    }
  }
}

function validatePair() {
  if (checkPair()) {
    currentPair[0][0].classList.add("paired");
    currentPair[1][0].classList.add("paired");
    currentPair = [];
    if (++pairsCount === numberOfCards / 2) {
      gameOver();
    }
  } else {
    setTimeout(computerFlip, 1000);
  }
}

function gameOver() {
  clearInterval(interval);
  alert(`Você ganhou em ${flipCount} jogadas!`);
  const playAgain = prompt("Deseja jogar novamente? [sim/não]");
  if (playAgain === "sim") {
    game();
  }
}

function computerFlip() {
  const flippedCards = document.querySelectorAll(".flipped:not(.paired)");
  for (const flippedCard of flippedCards) {
    flippedCard.classList.remove("flipped");
  }

  currentPair = [];
}

function canBeFlipped(card) {
  return currentPair.length !== 2 && !card.classList.contains("flipped");
}

function checkPair() {
  return currentPair[0][1] === currentPair[1][1];
}

function game() {
  setNumberOfCards();
  createDeck();
  createBoard();

  currentPair = [];
  pairsCount = 0;
  flipCount = 0;
  time = 0;

  interval = setInterval(() => (timer.textContent = `${++time}`), 1000);
}

const MIN_CARDS = 4;
const MAX_CARDS = 14;
const PARROTS = [
  "revertitparrot.gif",
  "bobrossparrot.gif",
  "tripletsparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "explodyparrot.gif",
  "unicornparrot.gif",
];

const main = document.querySelector("main");
const timer = document.querySelector(".timer");

let time = null;
let deck = null;
let interval = null;
let flipCount = null;
let pairsCount = null;
let currentPair = null;
let numberOfCards = null;

game();
