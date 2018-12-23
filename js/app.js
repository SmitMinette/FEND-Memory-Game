/* List of all cards */
const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/* Globals */

const deck = document.querySelector(".deck");
const modal = document.querySelector(".modal_box");
const movesText = document.querySelector(".moves");
const restartBtn = document.querySelector(".restart");
const stars = document.getElementsByClassName("fa-star");
const timer = document.querySelector(".timer");
const total_pairs = 8;

let interval;
let matched = 0;
let minutes = 0;
let numMoves = 0;
let openCards = [];
let seconds = 0;
let timerOff = true;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Shuffle Cards */
function shuffleCards() {
    const cards = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cards);
    for (card of shuffledCards){
        deck.appendChild(card);
        }
    }
shuffleCards();

 /* Click event listener */
function startGame (){
    deck.addEventListener('click', () => {
        const clickTarget = event.target;
        if (timerOff){
            displayTime();
            timerOff = false;
        }
        if (clickTarget.classList.contains("card") && openCards.length < 2 && !clickTarget.classList.contains("open")){
            clickTarget.classList.toggle("open");
            clickTarget.classList.toggle("show");
            addOpenCards(clickTarget);
                if (openCards.length === 2){
                    checkClickedCards(clickTarget);
                    moves();
                    starRating();
                    };
            };
            if (matched == total_pairs){
                gameOver();
            };
        });
    };

/* Add clicked cards to list */
function addOpenCards(clickTarget){
    openCards.push(clickTarget);
};

/* Check if cards match */
function checkClickedCards () {
    if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards = []
        matched ++;
    } else {
        setTimeout (() => {
            openCards[0].classList.toggle("open");
            openCards[0].classList.toggle("show");
            openCards[1].classList.toggle("open");
            openCards[1].classList.toggle("show");
            openCards = [];
        }, 500);
    };
};

/* Reset Cards */
function resetCards() {
    const cards = Array.from(document.querySelectorAll(".deck li"));
    for (let card of cards){
        card.className = "card";
    };
    matched = [];
    openCards = [];
};


/* Moves Counter */
function moves() {
    numMoves ++;
    movesText.innerHTML = numMoves;
};

/* Star rating */
function starRating() {
    if (numMoves==16){
        stars[2].style.display = 'none';
    }
    if (numMoves==24){
        stars[1].style.display = 'none';
    }
};

/* Star Count */
function getStars() {
    let starCount = 0;
    for (star of stars) {
        if (star.style.display !== "none"){
            starCount ++;
        }
    }
    return starCount;
};

/* Reset stars display */
function resetStars() {
    numOfStars = 0;
    for (star of stars) {
        star.style.display = "inline";
    }
};

/* Timer */
function displayTime(){
    interval = setInterval(function(){
        timer.innerHTML = minutes+"mins "+seconds+"secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        };
    },1000);
}
  
/* Stop the timer */
function stopTimer(){
    clearInterval(interval);
};

/* Reset Timer */
function resetTime(){
    clearInterval(interval);
    timer.innerHTML = "0 mins 0 secs";
    minutes = 0;
    seconds = 0;
    timerOff = true;
};

/* Game over */ 
function gameOver() {
    stopTimer();
    writeModalStats();
    toggleModal();
};

/* Toggle Modal */
function toggleModal(){
    modal.classList.toggle("hide");
};

/* Modal Stats */
function writeModalStats() {
    let finalTime = document.querySelector(".timer").innerHTML;
    let finalStars = getStars();
    document.querySelector(".modal_time").innerHTML = "Time = " + finalTime;
    document.querySelector(".modal_moves").innerHTML = "Moves = " + numMoves;
    document.querySelector(".modal_stars").innerHTML = "Total stars = " + finalStars;
};

/* Modal Cancel Button */
document.querySelector(".modal_cancel").addEventListener("click", () => {
    toggleModal();
});

/* Modal Retry Button */
document.querySelector(".modal_retry").addEventListener("click", () => {
    restartGame();
});

/* Restart button on home screen */
document.querySelector(".restart").addEventListener("click", () => {
    homeRestartGame();
});

/* Restart game on Homescreen */
function homeRestartGame(){
    numMoves = 0;
    movesText.innerHTML = numMoves;
    resetStars();
    resetTime();
    resetCards();
    shuffleCards();
    startGame();
};

/* Restart game Modal */
function restartGame(){
    toggleModal();
    numMoves = 0;
    movesText.innerHTML = numMoves;
    resetStars();
    resetTime();
    resetCards();
    shuffleCards();
    startGame();
};

