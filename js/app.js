console.log("App Loaded")

window.onload = function(){
	//$('#playbutton').on('click', go)
}

// var myFirebaseRef = new Firebase("https://owens-blackjack.firebaseio.com/");

// myFirebaseRef.authAnonymously(function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });


//shuffles card array with 4 decks
var shuffling = function(){
	var fourDeck = deck.concat(deck, deck, deck)
	return fourDeck.sort(function() { return 0.5 - Math.random() });

};

//saves shuffled card array as new variable
var shuffled = shuffling();






//deals to each player in player array, then dealer


/////NEED TO FIX ACE HANDLING/////////




var dealing = function(){
	for (var i = 0;i<player.length;i++){
		var deal = shuffled.splice(0,2);
		player[i].hand = deal;
		
		if (deal[0].abrv == 'A'){
			if ((player[i].handVal + 11)>21){
				deal[0].value = 1
				console.log("Ace low")
			}
			else{
				deal[0].value = 11;	
				console.log("Ace high")
		
			}
		}
		else if (deal[1].abrv == 'A'){
			if ((player[i].handVal + 11)>21){
				deal[1].value = 1
				console.log("Ace low")
			}
			else{
				deal[1].value = 11;	
				console.log("Ace high")
		
			}
		}
		player[i].handVal = player[i].hand[0].value + player[i].hand[1].value
		console.log(player[i].hand)
	}


	var deal = shuffled.splice(0,2);
	dealer.hand = deal;

		if (deal[0].abrv == 'A'){
			if ((dealer.handVal + 11)>21){
				deal[0].value = 1
				console.log("Ace low")
			}
			else{
				deal[0].value = 11;	
				console.log("Ace high")
		
			}
		}
		else if (deal[1].abrv == 'A'){
			if ((dealer.handVal + 11)>21){
				deal[1].value = 1
				console.log("Ace low")
			}
			else{
				deal[1].value = 11;	
				console.log("Ace high")
		
			}
		}

	dealer.handVal = dealer.hand[0].value + dealer.hand[1].value

	console.log(dealer.hand)
}



//Checking dealers hand
























// var user1;
// var goTime = function(){
// 	user1 = new User($('#namebox').val())
// 	$('#pregame').empty()
// 	usersRef.child(user1.auth.uid).set({
// 		name:user1.name,	
// 		bank: user1.bank,
// 		hand: user1.hand,
// 		hand2: user1.hand2,
// 		auth:user1.auth.uid	
// 	});
// }



// function go() {
//   var userId = $('#namebox').val();
//   var gameRef = new Firebase('https://owens-blackjack.firebaseio.com/blackjack');
//   assignPlayerNumberAndPlayGame(userId, gameRef);
// };
 
// var NUM_PLAYERS = 5;
 
// var GAME_LOCATION = "https://owens-blackjack.firebaseio.com/";
 
// var PLAYERS_LOCATION = 'player_list';
 
// var PLAYER_DATA_LOCATION = 'player_data';
 
 
// // Called after player assignment completes.
// function playGame(myPlayerNumber, userId, justJoinedGame, gameRef) {
//   var playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);
//   alert('You are player number ' + myPlayerNumber + 
//       '.  Your data will be located at ' + playerDataRef.toString());
 
//   if (justJoinedGame) {
//     alert('Doing first-time initialization of data.');
//     playerDataRef.set({userId: userId, state: 'game state'});
//   }
// }
 
// // Use transaction() to assign a player number, then call playGame().
// function assignPlayerNumberAndPlayGame(userId, gameRef) {
//   var playerListRef = gameRef.child(PLAYERS_LOCATION);
//   var myPlayerNumber, alreadyInGame = false;
 
//   playerListRef.transaction(function(playerList) {
//     // Attempt to (re)join the given game. Notes:
//     //
//     // 1. Upon very first call, playerList will likely appear null (even if the
//     // list isn't empty), since Firebase runs the update function optimistically
//     // before it receives any data.
//     // 2. The list is assumed not to have any gaps (once a player joins, they 
//     // don't leave).
//     // 3. Our update function sets some external variables but doesn't act on
//     // them until the completion callback, since the update function may be
//     // called multiple times with different data.
//     if (playerList === null) {
//       playerList = [];
//     }
 
//     for (var i = 0; i < playerList.length; i++) {
//       if (playerList[i] === userId) {
//         // Already seated so abort transaction to not unnecessarily update playerList.
//         alreadyInGame = true;
//         myPlayerNumber = i; // Tell completion callback which seat we have.
//         return;
//       }
//     }
 
//     if (i < NUM_PLAYERS) {
//       // Empty seat is available so grab it and attempt to commit modified playerList.
//       playerList[i] = userId;  // Reserve our seat.
//       myPlayerNumber = i; // Tell completion callback which seat we reserved.
//       return playerList;
//     }
 
//     // Abort transaction and tell completion callback we failed to join.
//     myPlayerNumber = null;
//   }, function (error, committed) {
//     // Transaction has completed.  Check if it succeeded or we were already in
//     // the game and so it was aborted.
//     if (committed || alreadyInGame) {
//       playGame(myPlayerNumber, userId, !alreadyInGame, gameRef);
//     } else {
//       alert('Game is full.  Can\'t join. :-(');
//     }
//   });
// }