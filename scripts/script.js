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
  <div class="card" onclick="flip(this)">
    <div class="front face">
      <img src="images/${frontImage}" alt="parrot gif"/>
    </div>
    
    <div class="back face">
      <img src="images/back.png" alt="parrot" />
    </div>
  </div>
`;
}

function game() {
  setNumberOfCards();
  createDeck();
  createBoard();
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

let deck;
let numberOfCards = null;
