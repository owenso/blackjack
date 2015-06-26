console.log("App Loaded")

window.onload = function(){
	$('#playbutton').on('click', go)
}

var myFirebaseRef = new Firebase("https://owens-blackjack.firebaseio.com/");

myFirebaseRef.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});


//shuffles card array with 4 decks
var shuffling = function(){
	var fourDeck = deck.concat(deck, deck, deck)
	return fourDeck.sort(function() { return 0.5 - Math.random() });

};

//saves shuffled card array as new variable
var shuffled = shuffling();






//deals to each player in player array, then dealer
var dealing = function(){
	
	//Resets player and dealer hand and value from last game
	for (var i = 0;i<player.length;i++){
		player[i].hand2 = [];
		player[i].handVal = [];
		player[i].splitHandVal = [];
		player[i].blackjack = false;
		player[i].busted = false;
		dealer.handVal = 0;
		dealer.blackjack= false;
		dealer.busted=false;
	};
	
	for (var i = 0;i<player.length;i++){

		//Shuffles in new cards if deck is less than 10
		if (shuffled.length<10){
			shuffled = shuffling()
		}
		var deal = shuffled.splice(0,2);
		player[i].hand = deal;

		//Checks to see if both cards are aces
		if ((deal[1].abrv) && ((deal[0].abrv == 'A') && (deal[1].abrv == 'A'))){
			console.log("Holy shit it worked.")
			//If both cards are aces, gives two values for each option (except 22 because that would bust)
			player[i].handVal[0] = 13;
			player[i].handVal[1] = 2;
		}
		//Checks to see if first card is an ace
		else if (deal[0].abrv == 'A'){

			//If first card is an ace, gives two hand values for each ace option
			player[i].handVal[0] = deal[1].value + 11;
			player[i].handVal[1] = deal[1].value + 1;

		}

		//Checks to see if second card is an ace
		else if (deal[1].abrv == 'A'){

			//If second card is an ace, gives two hand values for each ace option
			player[i].handVal[0] = deal[0].value + 11;
			player[i].handVal[1] = deal[0].value + 1;
		}

		//If neither card is an ace
		else{
		player[i].handVal[0] = player[i].hand[0].value + player[i].hand[1].value;
		}
		tellCard = player[i].hand[0].card + " and the " + player[i].hand[1].card; 
		player[i].checkFunc(tellCard);
	}


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
	console.log("Dealer has " + dealer.hand[0].card + " and " + dealer.hand[1].card + " for " + dealer.handVal)

}





var goTime = function(){
	player[1] = new User($('#namebox').val());
	usersRef.push(user1);
}









// var user1;
// var userId = 1;
// var goTime = function(){
// 	user1 = new User($('#namebox').val())
// 	user1.hand.push({
// 	card:"Ace of Spades",
// 	abrv:"A",
// 	suit:"Spades",
// 	value:[11,1],
// 	facedown:true
// 	})
// 	user1.hand.push({
// 	card:"King of Spades",
// 	abrv:"K",
// 	suit:"Spades",
// 	value:10,
// 	facedown:true
// 	})
// 	$('#pregame').empty()
// 	usersRef.set({
// 		name:user1.name,	
// 		bank: user1.bank,
// 		hand: user1.hand,
// 		hand2: user1.hand2
// 	});
// }



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
  var playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);
  alert('You are player number ' + myPlayerNumber + 
      '.  Your data will be located at ' + playerDataRef.toString());
 
  if (justJoinedGame) {
    alert('Doing first-time initialization of data.');
    playerDataRef.set({userId: userId, state: 'game state'});
  }
}
 
// Use transaction() to assign a player number, then call playGame().
function assignPlayerNumberAndPlayGame(userId, gameRef) {
  var playerListRef = gameRef.child(PLAYERS_LOCATION);
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