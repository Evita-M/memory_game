const board = document.querySelector(".game-board");
const card = document.querySelectorAll(".game-card");
const imgItem = document.querySelectorAll('.game-card-img')
const modal = document.querySelector(".modal");
const counter = document.getElementById("moveCounter");  
const clock = document.getElementById("timer");
const matchingPairsTotal = 8;

let flippedCards = [];
let imgItemsArray = [...imgItem];
let imageClicked;
let matchingPairs = 0;
let moves = 0;
let time = 0;
let clockOff = true;
let clockId;

//Reload page, shuffle images
window.onload = startGame;
function startGame() {
  let shuffledImgs = shuffle(imgItemsArray);
  for(i = 0; i < imgItemsArray.length; i++) {
  card[i].appendChild(shuffledImgs[i]);
  } 
};

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
};


function clickCard(event) {
  let target = event.target.children[0];
  if (target.classList.contains("game-card-img")) {
    if (clockOff) {
      startClock();
      clockOff = false;
  }
      toggleAndAddCard(target);
    }
  if (flippedCards.length === 2) {
      countMoves();
      compare();  
      board.removeEventListener("click", clickCard);    
      setTimeout(function(){ 
        board.addEventListener("click", clickCard);  
      }, 1500);
  } 
};

//Flip a card and add into array of flipped cards
function toggleAndAddCard(target) {
  target.classList.toggle("show-img");
  flippedCards.push(target);
};

//Compare flipped cards
function compare() {
  if (flippedCards[0].alt === flippedCards[1].alt) {
      flippedCards[0].classList.add("match");
      flippedCards[1].classList.add("match");
    document.getElementById("match-sound").play(); 
    matchingPairs++;
    flippedCards = [];
    if (matchingPairs === matchingPairsTotal){
      stopClock();
      showResults();
    }
  }
  else {
    setTimeout(function(){ 
      flippedCards[0].classList.remove("show-img");
      flippedCards[1].classList.remove("show-img");
      flippedCards = [];
    }, 1500);
  } 
};


//Moves and time display
function countMoves() {
  moves++;
  if (moves === 1) {
    counter.textContent = `${moves} move`;
  } else {
    counter.textContent = `${moves} moves`;
  }
};

function startClock() { 
  clockId = setInterval(() => {
      displayTime()
  time++;
  ;      
}, 1000);
};

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if(seconds < 10) {
      clock.innerHTML = `${minutes}:0${seconds}`;
  }else{
      clock.innerHTML = `${minutes}:${seconds}`;
  }
  rating(minutes, seconds);
};

function stopClock() {
  clearInterval(clockId);
};


//Reset results of previous game
function reset() {
  modal.style.display = "none";
  for (let i = 0; i < imgItemsArray.length; i++) {
    imgItemsArray[i].classList.remove("show-img");
    imgItemsArray[i].classList.remove("match");
  }
  flippedCards = [];
  matchingPairs = 0;
  moves = 0;
  counter.textContent = `${moves} moves`;
  time = 0;
  clock.innerHTML = "<span>0:00</span>"; 
  clockOff = true;
  stopClock();
  startGame();
};



//Game results
function showResults() {
  setTimeout( function(){ 
     modal.style.display = "block";
    document.getElementById("totalGameMoves").textContent =`${moves} moves`;
    document.getElementById("totalGameTime").textContent = clock.innerHTML;
  }, 2000);
};

function closeModal() {
  const closeModal = document.getElementById("closeModal");
  modal.style.display = "none";
};

function rating(minutes, seconds) {
    const rating = document.getElementById("finalRating");
    if (minutes === 0 && seconds < 60) {
      rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    } else if (minutes === 1 && seconds < 60) {
      rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    } else {
      rating.innerHTML = `<i class="fas fa-star"></i>`;
    }
};


board.addEventListener("click", clickCard);

