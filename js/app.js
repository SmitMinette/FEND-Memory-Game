/* List of all cards */
const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
/* Global */
const deck = document.querySelector(".deck");
let openCards = [];
let matched = 0;
let numMoves = 0;
let time = 0;
let timerOff = true;
let timerId;
let interval;
let minutes = 0;
let seconds = 0;
const total_pairs = 8;
const stars = document.getElementsByClassName("fa-star");
const timer = document.querySelector(".timer");
const restartBtn = document.querySelector(".restart");
const modal = document.querySelector(".modal_box");

/* To start the game */



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

 /* Click event listener */
 deck.addEventListener('click', () => {
    const clickTarget = event.target;
    if (timerOff){
        displayTime();
        timerOff = false;
    }
    if (clickTarget.classList.contains("card") && openCards.length < 2){
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

/* Shuffle Cards */
function shuffleCards() {
    const cards = Array.from(document.querySelectorAll(".deck li"));
    const shuffledCards = shuffle(cards);
    for (card of shuffledCards){
        deck.appendChild(card);
        }
    }
shuffleCards();

/* Moves Counter */
function moves() {
    numMoves ++;
    const movesText = document.querySelector(".moves");
    movesText.innerHTML = numMoves;
};

/* Star rating */
function starRating() {
    if (numMoves==12){
        stars[2].style.display = 'none';
    }
    if (numMoves==18){
        stars[1].style.display = 'none';
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
        }
        if(minutes == 60){
            hour++;
            minutes = 0;
        }
    },1000);
}
  

/* Stop the timer */
function stopTimer(){
    clearInterval(timerId);
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
}

/* Toggle Modal */
function toggleModal(){;
    modal.classList.toggle("hide");
};

/* Modal Stats */

function writeModalStats() {
    let finalTime = document.querySelector(".timer").innerHTML;
    let finalStars = getStars();
    modal.classList.add("show");
    document.querySelector(".modal_time").innerHTML = "Time = " + finalTime;
    document.querySelector(".modal_moves").innerHTML = "Moves = " + numMoves;
    document.querySelector(".modal_stars").innerHTML = "Total stars = " + finalStars;
};


/* Game over */ 
function gameOver() {
    stopTimer();
    writeModalStats();
    toggleModal();
}

