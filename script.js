const pokemonList = [
  "pikachu", "bulbasaur", "charmander", "squirtle",
  "jigglypuff", "meowth", "psyduck", "snorlax"
];

const getImageUrl = name =>
  `https://img.pokemondb.net/artwork/large/${name}.jpg`;

const gameBoard = document.getElementById("gameBoard");
let flippedCards = [];
let lockBoard = false;

setupBoard();   // ----> Arrancamos

/* ---------------- FUNCIONES ---------------- */

function setupBoard() {
  // Duplicamos y mezclamos
  const mixed = [...pokemonList, ...pokemonList].sort(() => Math.random() - 0.5);

  mixed.forEach(name => {
    const card = createCard(name);
    gameBoard.appendChild(card);
  });
}

function createCard(name) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.name = name;

  card.innerHTML = `
    <div class="card-front">
      <img src="${getImageUrl(name)}" alt="${name}"
           style="width:100%;height:100%;object-fit:cover">
    </div>
    <div class="card-back"></div>
  `;

  card.addEventListener("click", onCardClick);
  return card;
}


function onCardClick() {
  if (lockBoard || this.classList.contains("flip")) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  const isMatch = c1.dataset.name === c2.dataset.name;

  if (isMatch) {
    flippedCards = [];
    // Si quieres comprobar fin de juego, cuenta las que quedan sin flip
  } else {
    lockBoard = true;
    setTimeout(() => {
      c1.classList.remove("flip");
      c2.classList.remove("flip");
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}
function startGame() {
  document.getElementById("start-menu").style.display = "none";
  document.getElementById("gameBoard").style.display = "grid";

  setupBoard();
}

function showEndMenu() {
  document.getElementById("gameBoard").style.display = "none";
  document.getElementById("end-menu").style.display = "block";
}

function restartGame() {
  // Limpiar tablero
  gameBoard.innerHTML = "";
  flippedCards = [];
  lockBoard = false;

  document.getElementById("end-menu").style.display = "none";
  document.getElementById("start-menu").style.display = "block";
}
// Revisar si todas las cartas están volteadas
const totalFlipped = document.querySelectorAll(".card.flip").length;
if (totalFlipped === pokemonList.length * 2) {
  setTimeout(showEndMenu, 500);
}
