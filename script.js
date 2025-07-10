const pokemonList = [
  "pikachu", "bulbasaur", "charmander", "squirtle",
  "jigglypuff", "meowth", "psyduck", "snorlax"
];

const getImageUrl = name => `https://img.pokemondb.net/artwork/large/${name}.jpg`;

const gameBoard = document.getElementById("gameBoard");
let cards = [];
let flippedCards = [];
let lockBoard = false;

// Duplica y mezcla las cartas
function setupBoard() {
  const selected = [...pokemonList, ...pokemonList]; // Duplicamos
  cards = selected.sort(() => 0.5 - Math.random());

  cards.forEach(name => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = name;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${getImageUrl(name)}" alt="${name}" width="100%" />
        </div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flip")) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.name === card2.dataset.name;

  if (isMatch) {
    flippedCards = [];
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

setupBoard();
