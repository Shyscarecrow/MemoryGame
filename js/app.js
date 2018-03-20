 let ready = true; 
 /*The first and the second card of each opened pair */
 let card1 = '';
 let card2 = '';
 let card1Parent = '';
 let card2Parent = '';
 
 document.querySelector(".restart").addEventListener("click", restart);
 document.querySelector(".deck").addEventListener("click", timerStart);
 document.querySelector(".deck").addEventListener("click", cardOpen);
 document.querySelector(".playAgain").addEventListener("click", function(){document.querySelector(".winPage").className = "winPage closed"; restart()});
 
 function cardOpen(evt) {
	if (evt.target.className == "card") {
		evt.target.className += " open show";			
		if (!card1) {
			card1 = evt.target.firstElementChild.className;
			card1Parent = evt.target;
		} else {
			document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;
			/* Hide stars depend of moves count*/
			if (document.querySelector(".moves").innerText == '12' || document.querySelector(".moves").innerText == '18') {
				document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
			}
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

/* Return stars back to amount of 3 */

function returnStars(){
	while (document.getElementsByClassName("fa-star").length != 3) {
		var newStar = document.createElement("li");
		newStar.className = "fa fa-star";
		document.querySelector(".stars").appendChild(newStar);
	}
}

 function restart() {
	document.querySelector(".moves").innerText = "0";
    document.querySelector('#timer').innerHTML = "00:00:00";
	returnStars();
	
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


function win() {
	document.querySelector(".movesCount").innerText = document.querySelector(".moves").innerText;
	document.querySelector(".starsCount").innerText = document.getElementsByClassName("fa-star").length;
	var matchingCards = document.getElementsByClassName('card match open show');
	if (matchingCards.length == 16) {
		setTimeout (function() {document.querySelector(".winPage").className = "winPage"}, 1000);
	}
}



 





