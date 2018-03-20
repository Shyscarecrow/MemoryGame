 let ready = true; 
 let card1 = '';
 let card2 = '';
 let card1Parent = '';
 let card2Parent = '';
 
 document.querySelector(".restart").addEventListener("click", restart);
 document.querySelector(".deck").addEventListener("click", timerStart);
 document.querySelector(".deck").addEventListener("click", cardOpen);
 
 function cardOpen(evt) {
	if (evt.target.className == "card") {
		evt.target.className += " open show";		
		if (!card1) {
			card1 = evt.target.firstElementChild.className;
			card1Parent = evt.target;
		} else {
			document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;
			card2 = evt.target.firstElementChild.className;
			card2Parent = evt.target;
			if (card1 ==card2) {
				card1Parent.className = "card open show match";
				card2Parent.className = "card open show match";
				card1 = '';
				card2 = '';
				win();
			} else {
				setTimeout(function() {evt.target.className = "card close"; card1Parent.className = "card close"}, 700);
				setTimeout(function() {evt.target.className = "card"; card1Parent.className = "card"; card1 = ''; card2 = ''}, 900);
			}
		}	
		
	ready = false;
		
	}
}

 function restart() {
	document.querySelector(".moves").innerText = "0";
	//document.querySelector('#timer').innerHTML = "0" + ':' + "0" + ':' + "0";
	
	let cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
	cards = shuffle(cards);
	const deck = document.querySelector(".deck");
	
	for (let i = 0; i < cards.length; i++) {
		deck.appendChild(cards[i]);
		cards[i].className = "card";
	}
	
	ready = true;
 }
 
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

function timerStart(){
	if (ready == true) {
		var timer = 0;
		var hour = 0;
		var minute = 0;
		var second = 0;
		window.setInterval(function(){
		  ++timer;
		  hour   = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
		}, 1000);
	}
}

function timerReset() {
	clearTimeout;
}

function win() {
	var matchingCards = document.getElementsByClassName('card match open show');
	if (matchingCards.length == 16) {
		setTimeout (function() {alert("You win!")}, 1000);
	}
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
