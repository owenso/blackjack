console.log("App Loaded")

window.onload = function(){
	$('#playbutton').on('click', go);
	$('#namebox').on('keypress', function (e){
		if (e.keyCode == 13){
			go();
		}
	});
	$('#messageInput').keypress(function (e) {
  		if (e.keyCode == 13) {
    	var name = player[myNumber].name
    	var text = $('#messageInput').val();
    	myChatRef.push({name: name, text: text, playernum: myNumber});
    	$('#messageInput').val('');
  		}
	});
}


//shuffles card array with 4 decks
var shuffling = function(){
	var fourDeck = deck.concat(deck, deck, deck)
	return fourDeck.sort(function() { return 0.5 - Math.random() });

};

//saves shuffled card array as new variable
var shuffled = shuffling();



var myNumber;
var playerDataRef;
var myFirebaseRef = new Firebase("https://owens-blackjack.firebaseio.com/");
var listOfPlayers = new Firebase('https://owens-blackjack.firebaseio.com/player_list');
var dealerDataRef = new Firebase('https://owens-blackjack.firebaseio.com/dealer_data');
var currentPlayers = 0;
var playerArrayRef = new Firebase('https://owens-blackjack.firebaseio.com/player_data');
var player0Ref = new Firebase('https://owens-blackjack.firebaseio.com/player_data/0/')
var player1Ref = new Firebase('https://owens-blackjack.firebaseio.com/player_data/1/')
var player2Ref = new Firebase('https://owens-blackjack.firebaseio.com/player_data/2/')
var player3Ref = new Firebase('https://owens-blackjack.firebaseio.com/player_data/3/')
var player4Ref = new Firebase('https://owens-blackjack.firebaseio.com/player_data/4/')
var gameDataRef = new Firebase('https://owens-blackjack.firebaseio.com/game_data/')
var betDataRef = new Firebase('https://owens-blackjack.firebaseio.com/game_data/betCount/')




//Dynamically calculates #of players
myFirebaseRef.on('value', function(snapshot){
	currentPlayers = snapshot.child('player_list').numChildren();
})


playerArrayRef.on('value', function(snapshot){
	if (currentPlayers>0){
	for (var i = 0; i < currentPlayers; i++) {
		$('#player'+ i +"name").text(snapshot.val()[i].name);
		$('#playermoney' + i).text(snapshot.val()[i].bank);
		$('#player'+i+'icon').css('background', colorGiver(i));	
		if (snapshot.val()[i].turn == true){
			$('#player'+i+'icon').css('border', '4px solid white');
		}
		else{
			$('#player'+i+'icon').css('border', 'none')
		}
		};
	}	
})

// playerArrayRef.on('value', function(snapshot){
// 	if(player[myNumber]){
// 		if ((player[myNumber].bet) && (myNumber !== 0 ) && player[myNumber].hand.length == 0){
// 			dealing();
// 		}
// 	}
// })


// playerArrayRef.on('value', function(snapshot){
// 	if (player[myNumber]){
// 		if ((snapshot.val()[myNumber].turn == true) && (player[myNumber].bet == 0)){
// 			takeBets();
// 		}
// 	}
// })





//deals to each player in player array, then dealer
var dealing = function(){
	//Resets player and dealer hand and value from last game	
		player[myNumber].hand2 = [];
		player[myNumber].handVal = [];
		player[myNumber].splitHandVal = [];
		player[myNumber].blackjack = false;
		player[myNumber].busted = false;
		player[myNumber].push = false;
		player[myNumber].won = false;
		player[myNumber].lost = false;


		//Shuffles in new cards if deck is less than 10
		if (shuffled.length<10){
			shuffled = shuffling()
		}
		var deal = shuffled.splice(0,2);
		player[myNumber].hand = deal;

		//Checks to see if both cards are aces
		if ((deal[1].abrv) && ((deal[0].abrv == 'A') && (deal[1].abrv == 'A'))){
			console.log("Holy shit it worked.")
			//If both cards are aces, gives two values for each option (except 22 because that would bust)
			player[myNumber].handVal[0] = 13;
			player[myNumber].handVal[1] = 2;
		}
		//Checks to see if first card is an ace
		else if (deal[0].abrv == 'A'){

			//If first card is an ace, gives two hand values for each ace option
			player[myNumber].handVal[0] = deal[1].value + 11;
			player[myNumber].handVal[1] = deal[1].value + 1;

		}

		//Checks to see if second card is an ace
		else if (deal[1].abrv == 'A'){

			//If second card is an ace, gives two hand values for each ace option
			player[myNumber].handVal[0] = deal[0].value + 11;
			player[myNumber].handVal[1] = deal[0].value + 1;
		}

		//If neither card is an ace
		else{
		player[myNumber].handVal[0] = player[myNumber].hand[0].value + player[myNumber].hand[1].value;
		}
		tellCard = player[myNumber].hand[0].card + " and the " + player[myNumber].hand[1].card; 
		player[myNumber].checkFunc(tellCard);

		playerDataRef.update({hand:player[myNumber].hand, handVal:player[myNumber].handVal});

		//Adds card to DOM
		 playerCardDOM();
		
		//Player 0 activates the dealer's cards
		// if (myNumber == 0){
		// 	// dealerDealing();

		// }



		//Syncs other players data 
		playerArrayRef.on('value', function(snapshot){


			for(var i = 0; i<currentPlayers;i++){
				if (myNumber !== i){
					player[i] = snapshot.val()[i];
					
					if (player[i].hand){
					updateArray[i]();
					}
				}
			}

		})
	
	
	


		// //For players other than player[0], gets dealer data from firebase whever it is changed.

		// dealerDataRef.on('value', function(snapshot){
		// if (myNumber !== 0){
		// 	dealer.blackjack = snapshot.val().blackjack;
		// 	dealer.busted = snapshot.val().busted;
		// 	dealer.handVal = snapshot.val().handVal;
		// 	dealer.hand = snapshot.val().hand;
		// 	}
		// })



}




var dealerDealing = function(){
	dealer.blackjack = false;
	dealer.busted = false;
	dealer.push = false;
	dealer.hand = [];
	dealer.handVal = 0;
	dealerDataRef.update({blackjack:dealer.blackjack, busted:dealer.busted,push:dealer.push, hand:dealer.hand, handVal:dealer.handVal})


	var deal = shuffled.splice(0,2);
	dealer.hand = deal;

		if (deal[0].abrv == 'A'){
			if ((dealer.handVal + 11)>21){
				deal[0].value = 1
				console.log("Dealer Ace low")
			}
			else{
				deal[0].value = 11;	
				console.log("Dealer Ace high")
		
			}
		}
		else if (deal[1].abrv == 'A'){
			if ((dealer.handVal + 11)>21){
				deal[1].value = 1
				console.log("Dealer Ace low")
			}
			else{
				deal[1].value = 11;	
				console.log("Dealer Ace high")
		
			}
		}
	dealer.handVal = dealer.hand[0].value + dealer.hand[1].value

	dealerDataRef.update({hand:dealer.hand, handVal:dealer.handVal});


	dealerCardDOM();

	console.log("Dealer has " + dealer.hand[0].card + " and " + dealer.hand[1].card + " for " + dealer.handVal)

}


var dealerCardDOM = function(){
		var card = $('<div>').addClass('suit'+ dealer.hand[0].suit).appendTo('#dealerhand');
		$('<p>').text(dealer.hand[0].abrv).appendTo(card);

		var downcard = $('<div>').addClass('cardBack').appendTo('#dealerhand');
		$('<p>').text(dealer.hand[1].abrv).css('visibility', 'hidden').appendTo(downcard);

}

var dealerHitDOM = function(){
	console.log(dealer.hand.length)
	for(var i=2;i<dealer.hand.length;i++){
		var card = $('<div>').addClass('suit'+ dealer.hand[i].suit).appendTo('#dealerhand');
		$('<p>').text(dealer.hand[i].abrv).appendTo(card);
	}
	
	dealerCardReveal();

}

var dealerCardReveal = function(){
	$('.cardBack p').css('visibility', 'visible');
	$('.cardBack').addClass('suit'+ dealer.hand[1].suit).removeClass('cardBack');
}

var playerCardDOM = function(){
	for(var i = 0; i<player[myNumber].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[myNumber].hand[i].suit).appendTo('#playerhand' + myNumber);
		$('<p>').text(player[myNumber].hand[i].abrv).appendTo(card);
	}
}

var playerHitDOM = function(){
	var card = $('<div>').addClass('suit'+ player[myNumber].hand[player[myNumber].hand.length-1].suit).appendTo('#playerhand' + myNumber);
	$('<p>').text(player[myNumber].hand[player[myNumber].hand.length-1].abrv).appendTo(card);
}






var playerUpdate0 = function(){
	$('#playerhand0').empty();
	for(var i = 0; i<player[0].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[0].hand[i].suit).appendTo('#playerhand0');
		$('<p>').text(player[0].hand[i].abrv).appendTo(card);
	}
}
var playerUpdate1 = function(){
	$('#playerhand1').empty();
	for(var i = 0; i<player[1].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[1].hand[i].suit).appendTo('#playerhand1');
		$('<p>').text(player[1].hand[i].abrv).appendTo(card);
	}
}
var playerUpdate2 = function(){
	$('#playerhand2').empty();
	for(var i = 0; i<player[2].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[2].hand[i].suit).appendTo('#playerhand2');
		$('<p>').text(player[2].hand[i].abrv).appendTo(card);
	}
}
var playerUpdate3 = function(){
	$('#playerhand3').empty();
	for(var i = 0; i<player[3].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[3].hand[i].suit).appendTo('#playerhand3');
		$('<p>').text(player[3].hand[i].abrv).appendTo(card);
	}
}
var playerUpdate4 = function(){
	$('#playerhand4').empty();
	for(var i = 0; i<player[4].hand.length; i++){
		var card = $('<div>').addClass('suit'+ player[4].hand[i].suit).appendTo('#playerhand4');
		$('<p>').text(player[4].hand[i].abrv).appendTo(card);
	}
}

var updateArray = [playerUpdate0, playerUpdate1, playerUpdate2, playerUpdate3, playerUpdate4]

var nextTurn = function(){
	console.log('in here')
		player[myNumber].turn = false;
		playerDataRef.update({turn: player[myNumber].turn})

		if (myNumber<4){
			player[myNumber + 1].turn = true;
			playerArrayRef.child(myNumber + 1).update({turn: true})
		}
	if (myNumber == 4){
		dealer.dealerCheck();
	}
}


var takeBets= function(){
	var bettybet = parseInt(prompt('Place Your Bets!'))
	player[myNumber].betting(bettybet)

}


var stand = function (){
	console.log("standing")
		nextTurn();
	}



var gameGo = function(){
  	dealerDataRef.remove();


	takeBets();

  	betDataRef.child(myNumber).set({placeholder:myNumber})
  	betDataRef.on('value', function(snapshot){
  		if (snapshot.numChildren() == 5){
  			if(myNumber == 0){
  				dealerDealing();
  			}



  			dealing();


			//For players other than player[0], gets dealer data from firebase whever it is changed.

			dealerDataRef.on('value', function(snapshot){
			
				dealer.handVal = snapshot.val().handVal;
				dealer.hand = snapshot.val().hand;
				dealer.blackjack = snapshot.val().blackjack;
				dealer.busted = snapshot.val().busted;
				
			if ((myNumber!==0)&&dealer.hand.length == 2){
				dealerCardDOM();
			}
			if ((myNumber!==4)&&dealer.hand.length > 2) {
				dealerHitDOM();
			}
			})





	 	dealerDataRef.once('value', function(snapshot){
	 		if(myNumber == 0){
			  	player[0].turn = true;
				playerDataRef.update({turn: true})
			};
	  	})
  		}
  	})


  	// betDataRef.child(myNumber).remove();
}



function go() {

  var userId = $('#namebox').val()

  // Consider adding '/<unique id>' if you have multiple games.
  var gameRef = new Firebase(GAME_LOCATION);
  assignPlayerNumberAndPlayGame(userId, gameRef);
};
 
// The maximum number of players.  If there are already 
// NUM_PLAYERS assigned, users won't be able to join the game.
var NUM_PLAYERS = 5;
 
// The root of your game data.
var GAME_LOCATION = 'https://owens-blackjack.firebaseio.com/';
 
// A location under GAME_LOCATION that will store the list of 
// players who have joined the game (up to MAX_PLAYERS).
var PLAYERS_LOCATION = 'player_list';
 
// A location under GAME_LOCATION that you will use to store data 
// for each player (their game state, etc.)
var PLAYER_DATA_LOCATION = 'player_data';
 
 
// Called after player assignment completes.
function playGame(myPlayerNumber, userId, justJoinedGame, gameRef) {
  playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);
  player[myPlayerNumber] = new User($('#namebox').val(), myPlayerNumber);
  myNumber = myPlayerNumber;

  //Remove player data when they leave
  playerDataRef.onDisconnect().remove();
  gameRef.child(PLAYERS_LOCATION).child(myPlayerNumber).onDisconnect().remove();
  betDataRef.child(myPlayerNumber).onDisconnect().remove();



  //removes name box
  $('#pregame').remove();


  //activates the hit button - "proxy" makes it so that "this" doesnt point at the button
  $('#hitbutton').on('click', $.proxy(player[myNumber].hit, player[myNumber]));
  $('#standbutton').on('click', $.proxy(stand, player[myNumber]));





  console.log('You are player number ' + myPlayerNumber + 
      '.  Your data will be located at ' + playerDataRef.toString());
 
  if (justJoinedGame) {
    console.log('Doing first-time initialization of data.');
    playerDataRef.set({userId: userId, name: player[myPlayerNumber].name, bank: player[myPlayerNumber].bank, bet:player[myPlayerNumber].bet, busted:player[myPlayerNumber].busted, blackjack:player[myPlayerNumber].blackjack, push:player[myPlayerNumber].push, won:player[myPlayerNumber].won, lost:player[myPlayerNumber].lost, turn:player[myPlayerNumber].turn
    });
  }

 


  	//manages turns
	playerDataRef.on('value', function(snapshot){
		if ((snapshot.val().turn == true)&&(player[myNumber].hand.length>0)){
			$('#gamebuttondiv').css('visibility', 'visible')
		}
		else{
			$('#gamebuttondiv').css('visibility', 'hidden')
		}
	})

gameGo();
}
 
// Use transaction() to assign a player number, then call playGame().
function assignPlayerNumberAndPlayGame(userId, gameRef) {
  playerListRef = gameRef.child(PLAYERS_LOCATION);


  var myPlayerNumber, alreadyInGame = false;
 
  playerListRef.transaction(function(playerList) {
    // Attempt to (re)join the given game. Notes:
    //
    // 1. Upon very first call, playerList will likely appear null (even if the
    // list isn't empty), since Firebase runs the update function optimistically
    // before it receives any data.
    // 2. The list is assumed not to have any gaps (once a player joins, they 
    // don't leave).
    // 3. Our update function sets some external variables but doesn't act on
    // them until the completion callback, since the update function may be
    // called multiple times with different data.
    if (playerList === null) {
      playerList = [];
    }
 
    for (var i = 0; i < playerList.length; i++) {
      if (playerList[i] === userId) {
        // Already seated so abort transaction to not unnecessarily update playerList.
        alreadyInGame = true;
        myPlayerNumber = i; // Tell completion callback which seat we have.
        return;
      }
    }
 
    if (i < NUM_PLAYERS) {
      // Empty seat is available so grab it and attempt to commit modified playerList.
      playerList[i] = userId;  // Reserve our seat.
      myPlayerNumber = i; // Tell completion callback which seat we reserved.
      return playerList;
    }
 
    // Abort transaction and tell completion callback we failed to join.
    myPlayerNumber = null;

  }, function (error, committed) {
    // Transaction has completed.  Check if it succeeded or we were already in
    // the game and so it was aborted.
    if (committed || alreadyInGame) {
      playGame(myPlayerNumber, userId, !alreadyInGame, gameRef);
    } else {
      alert('Game is full.  Can\'t join. :-(');
    }
  });

}







////In case I want to make the cards better
	// var suitText = function(){
	// 	if (dealer.hand[dealer.hand.length-1].suit == 'Diamonds'){
	// 		return "♦"
	// 	}
	// 	else if ((dealer.hand[dealer.hand.length-1].suit == 'Hearts')){
	// 		return "♥"
	// 	}
	// 	else if ((dealer.hand[dealer.hand.length-1].suit == 'Clubs')){
	// 		return "♣"
	// 	}
	// 	else if ((dealer.hand[dealer.hand.length-1].suit == 'Spades')){
	// 		return "♠"
	// 	}
	// }
