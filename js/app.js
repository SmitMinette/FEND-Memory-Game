/* List of all cards */
const listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deck = document.querySelector(".deck");
let clickedCards = [];
let noMoves = 0;

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 /* Cards 'show' and 'open when clicked. Only 2 cards 'show' at a time*/
 deck.addEventListener('click', () => {
     const clickTarget = event.target;
     if (clickTarget.classList.contains("card") && clickedCards.length < 2){
         clickTarget.classList.add('open');
         clickTarget.classList.add('show');
         listClickedCards(clickTarget);
         if (clickedCards.length === 2){
             checkClickedCards();
             moves();
            };
        };
    });

/* Add clicked cards to list */
function listClickedCards(clickTarget){
    clickedCards.push(clickTarget);
};

/* Check if cards match */
function checkClickedCards () {
    if(clickedCards[0].firstElementChild.className === clickedCards[1].firstElementChild.className){
        clickedCards[0].classList.toggle('match');
        clickedCards[1].classList.toggle('match');
        clickedCards = [];
    } else {
        setTimeout (() => {
        clickedCards[0].classList.remove('open', 'show');
        clickedCards[1].classList.remove('open', 'show');
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

/* Moves */
function moves() {
    noMoves ++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = noMoves;
};