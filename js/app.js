/*
 * Create a list that holds all of your cards
 */
 let preCard = null, currCard = null;
let cardSymbols=[],openCards = [],openForMatch=[];
let movesEl,moveCount = 0,time=0;
let gameStart = true;//flag for game start.
let counter = document.querySelector(".counter"); 
let counterStopId,stars, starCount=3;
stars = document.querySelectorAll(".stars li");
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

/**
* @desc click listener for deck
*/

function deckClickListener(event) {
	let clickedCard = event.target;
	//console.log(clickedCard);
	if(clickedCard.nodeName =="LI" || clickedCard.nodeName == "I" ) {
		if(clickedCard.nodeName == "I") {
			clickedCard = clickedCard.parentNode;
			//console.log(clickedCard);
		}
		if(gameStart) {//at first click, start counter.
			startCounter();
			gameStart = false;
		}
		//console.log(event.target);
		if(openForMatch.length ==1) {//one card is already open for matching.
			if(clickedCard == openForMatch[0]) {//same card is clicked again.
				console.log("same card is clicked again");
				return;
			}
		}
		//add card to openForMatch list
		addToOpenForMatchList(clickedCard);
		//show card symbol.
		revealCard(clickedCard);
		//set star
		setStarRating();
		//check for match with previous open card.
		if(openForMatch.length == 1) return;// will be matched with next card.
		checkForMatch();
	}
}
//add to openForMatch list
function addToOpenForMatchList(card) {
	openForMatch.push(card);
}
//revela the symbol for clicked card.
function revealCard(card){
	card.classList.add("show");
}

//add to clicked List
function addToOpenCardList(card) {
	openCards.push(card);

}

//find out the current star.
function setStarRating() {
	if(moveCount == 11) {
		removeAStar(stars[2]);
		starCount -= 1;
	}
	else if(moveCount == 15) {
		removeAStar(stars[1]);
		starCount -= 1;
	}
	else if(moveCount == 18) {
		removeAStar(stars[0]);
		starCount -= 1;
	}
	/*if(moveCount > 18) {
		//show no star 
		//remove first one.
		removeAStar(stars[0]);
		//decrease star count
		--starCount;
	}
	else if(moveCount > 14) {
		//show one star
		//remove 2nd last
		removeAStar(stars[1]);
		//decrease star count.
		--starCount;
	}
	else if(moveCount > 10){
		//show two star
		//remove last one
		removeAStar(stars[2]);
		//decrease star count
		--starCount;
	}*/
}

//make star bg-color darkgray
function removeAStar(star) {
	star.style.color = "darkgray";
}

//reset star ratings
function resetStarRatings() {
	starCount = 3;
	stars.forEach(function(star) {
		star.style.color = "black";
	})
}
//check if last two card matches in openCards list.

function checkForMatch() {
	let currCardSymbol = openForMatch[1].children[0].classList[1];
	let preCardSymbol = openForMatch[0].children[0].classList[1];
	//console.log(currCardSymbol);
	//console.log(preCardSymbol);
	increamentMoves();
	showMoves();
	if(currCardSymbol == preCardSymbol) {//card matched
		//add cards from openForMatch to openCards.And empty openForMatch
		openCards.push(openForMatch.pop());
		openCards.push(openForMatch.pop());
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
		removeUnmatchedCardFromOpenForMatch();
	},500);
	
}

//unmatched style
function unmatchedStyle() {
	//hide cards
	openForMatch[1].classList.remove("show");
	openForMatch[0].classList.remove("show");
}
//poped out unmatched card.
function removeUnmatchedCardFromOpenForMatch(){
	openForMatch.pop();
	openForMatch.pop();
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
	let scStars = document.querySelector(".sc-stars");
	let scMoves = document.querySelector(".sc-moves");
	let scTime = document.querySelector(".sc-time");
	let scRestartBtn = document.querySelector(".sc-restart");
	let scExitBtn= document.querySelector(".sc-exit");
	scStars.innerHTML = `Star Ratings ${starCount} ${starCount>=2?"stars":"star"}`;
	scMoves.innerHTML = `${moveCount}`;
	scTime.innerHTML = `${time}`;
	showScoreCard();
	scRestartBtn.addEventListener("click",restartGame);
	scExitBtn.addEventListener("click",exitSCBoard);
	

}

//restart game from sc-board.
//immediately start counter.
//click listener for sc-restart button
function restartGame() {
	exitSCBoard();
	startCounter();
}

//exit game from sc
//on first clickon card start counter.
//click listener for sc-exit button.
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
	//reset star ratings to 3.
	resetStarRatings();
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