/*
 * Create a list that holds all of your cards
 */
let cardSymbols=[];
let openCards = [];
let deck = document.querySelector(".deck");
//access all symbols and push it to cardSymbols array.
document.querySelectorAll(".deck .card i").forEach(function(cardSymbol){
	cardSymbols.push(cardSymbol.classList[1]);
});
//console.log(cardSymbols);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {
	let inner = '';
	cardSymbols.forEach(function(symbol){
		inner += `<li class="card">
                <i class="fa ${symbol}"></i>
            </li>`; 
	});
	deck.innerHTML = inner;
}
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
function setsUpEventListener() {
	deck.addEventListener("click" , deckClickListener);
}

function deckClickListener(event) {
	let clickedCard = event.target;
	if(clickedCard.nodeName =="LI" || clickedCard.nodeName == "I") {
		//console.log(event.target);
		//show card symbol.
		revealCard(clickedCard);
		//add card to open card list
		addToOpenCardList(clickedCard);
		//check for match with previous open card.
		if(openCards.length %2 == 0) return;// will be matched with next card.
		checkForMatch();

	}
}

//revela the symbol for clicked card.
function revealCard(card){

}

//add to clicked List
function addToOpenCardList(card) {

}

//check if card match with previous open Card.

function checkForMatch() {

}
 /*
 	testing
 */
//for displaying.
 cardSymbols = shuffle(cardSymbols);
displayCards();
let arr = [1,2,3,4];
console.log(arr);
console.log(shuffle(arr));
//for clck listener
setsUpEventListener();