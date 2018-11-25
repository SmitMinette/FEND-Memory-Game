/* List of all cards */
const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

const deck = document.querySelector(".deck");
let clickedCards = [];
let numMoves = 0;
let seconds = 0;
let minutes = 0;
let interval;
const stars = document.getElementsByClassName("fa-star");
const timer = document.querySelector(".timer");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

 /* Cards 'show' and 'open when clicked. Only 2 cards 'show' at a time*/
 deck.addEventListener('click', () => {
     const clickTarget = event.target;
     if (clickTarget.classList.contains("card") && clickedCards.length < 2){
         clickTarget.classList.add("open");
         clickTarget.classList.add("show");
         listClickedCards(clickTarget);
         if (clickedCards.length === 2){
             checkClickedCards();
             moves();
            };
        };
        starRating();
    });

/* Add clicked cards to list */
function listClickedCards(clickTarget){
    clickedCards.push(clickTarget);
};

/* Check if cards match */
function checkClickedCards () {
    if(clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className){
        clickedCards[0].classList.toggle("match");
        clickedCards[1].classList.toggle("match");
        clickedCards = [];
    } else {
        setTimeout (() => {
        clickedCards[0].classList.remove("open", "show");
        clickedCards[1].classList.remove("open", "show");
        clickedCards = [];
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
function startTimer(){
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
};
startTimer();