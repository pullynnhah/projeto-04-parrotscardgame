function getNumberOfCards() {
  numberOfCards = Number(
    prompt(
      `Com quantas cartas deseja jogar?\nEntre um número par no intervalo: [${MIN_CARDS}, ${MAX_CARDS}]`
    )
  );

  if (!isNumberOfCardsValid(numberOfCards)) {
    getNumberOfCards();
  }
}

function isNumberOfCardsValid(n) {
  return n % 2 === 0 && n >= 4 && n <= 14;
}

const MIN_CARDS = 4;
const MAX_CARDS = 14;
const parrots = [
  "revertitparrot.gif",
  "bobrossparrot.gif",
  "tripletsparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "explodyparrot.gif",
  "unicornparrot.gif",
];

let numberOfCards = null;
