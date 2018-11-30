/*
 * Create a list that holds all of your cards
 */
let cardSymbols=[],openCards = [], movesEl,moveCount = 0,time=0;
let gameStart = true;//flag for game start.
let counter = document.querySelector(".counter"); 
let counterStopId;
let deck = document.querySelector(".deck");
movesEl = document.querySelector(".moves");

//access all symbols and push it to cardSymbols array.
document.querySelectorAll(".deck .card i").forEach(function(cardSymbol){
	cardSymbols.push(cardSymbol.classList[1]);
});

//set click listener on restart button
document.querySelector(".restart").addEventListener("click",resetGame);
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
		if(gameStart) {//at first click start counter.
			startCounter();
			gameStart = false;
		}
		//console.log(event.target);
		//show card symbol.
		revealCard(clickedCard);
		//add card to open card list
		addToOpenCardList(clickedCard);
		//check for match with previous open card.
		if(openCards.length %2 != 0) return;// will be matched with next card.
		checkForMatch();
	}
}
			

//revela the symbol for clicked card.
function revealCard(card){
	card.classList.add("show");
}

//add to clicked List
function addToOpenCardList(card) {
	openCards.push(card);

}

//check if last two card matches in openCards list.

function checkForMatch() {
	let firstCardSymbol = openCards[openCards.length-2].children[0].classList[1];
	let secondCardSymbol = openCards[openCards.length-1].children[0].classList[1];
	//console.log(firstCardSymbol);
	//console.log(secondCardSymbol);
	increamentMoves();
	showMoves();
	if(firstCardSymbol == secondCardSymbol) {//card matched
		matchedEffect();
	}
	else{
		unmatchedEffect();
	}
}

//add matching style.

function matchedEffect() {
	matchedStyle();//add matched style to card
	if(isGameOver()){//game is over
		//stopCounter();
		generateAndShowScoreCard();
		//showScoreCard();
	}
}

function matchedStyle() {
	openCards[openCards.length-2].classList.add("open");
	openCards[openCards.length-1].classList.add("open");
}

//add unmatching style 
function unmatchedEffect() {
	setTimeout(function(){
		unmatchedStyle();	
		removeUnmatchedCardFromOpenList();
	},500);
	
}

//unmatched style
function unmatchedStyle() {
	openCards[openCards.length-2].classList.remove("show");
	openCards[openCards.length-1].classList.remove("show");
}
//poped out unmatched card.
function removeUnmatchedCardFromOpenList(){
	openCards.pop();
	openCards.pop();
	//console.log(openCards.length);
}

//increase moveCount by one
function increamentMoves() {
	moveCount += 1;
}

//display moveCount
function showMoves() {
	movesEl.innerHTML = `${moveCount}`;
}

//check if game is over?
function isGameOver(){
	if(openCards.length == 16) return true;
	return false;
}

//on successfully completion
function showScoreCard() {
	setTimeout(function(){
		hideGameBoard();
		//remove hidden class 
		document.querySelector(".sc-model").classList.toggle("hidden");
	},100);
}

//access moves, time-taken.
function generateAndShowScoreCard() {
	//stop counting time
	stopCounter();
	let scMoves = document.querySelector(".sc-moves");
	let scTime = document.querySelector(".sc-time");
	let scRestartBtn = document.querySelector(".sc-restart");
	let scExitBtn= document.querySelector(".sc-exit");
	scMoves.innerHTML = `${moveCount}`;
	scTime.innerHTML = `${time}`;
	showScoreCard();
	scRestartBtn.addEventListener("click",restartGame);
	scExitBtn.addEventListener("click",exitSCBoard);
	

}

//restart game from sc-board.
function restartGame() {
	exitSCBoard();
	startCounter();
}

//exit game from sc
function exitSCBoard() {
	hideScoreCard()
	showGameBoard();
	resetGame(null);
}

//remove score-card board.
function hideScoreCard() {
	//toggle class hidden on sc-model elem.
	document.querySelector(".sc-model").classList.toggle("hidden");
	
}

//
function showGameBoard() {
	//toggle display-score-card class .
	document.querySelector(".container").classList.toggle("display-score-card");
}
//reset move, time 
function resetGame(event) {
	//set moveCount to zero
	moveCount = 0;
	showMoves();
	//stop the counter.
	if(event) {//called as listener for restart button click
		stopCounter();
	}
	//start counter from zero.
	time = 0;
	counter.innerHTML = time ;
	//shuffle card
	cardSymbols = shuffle(cardSymbols);
	//display cards
	displayCards();
	//empty openCards array
	openCards = [];
	gameStart  = true;
}
//start time

function startCounter() {
	counterStopId =  setInterval(function(){
		//increase counter by one.
		++time;
		//show counter.
		counter.innerHTML= `${time}`;

	},1000);

}
//game is over
function stopCounter(){
	//stop setInterval for counter stop.
	clearInterval(counterStopId);
}
//hide game-board
function hideGameBoard() {
	//toggle display-score-card class.
	document.querySelector(".container").classList.add("display-score-card");
}
 /*
 	testing
 */
//for displaying.
 cardSymbols = shuffle(cardSymbols);
displayCards();
//for clck listener
setsUpEventListener();