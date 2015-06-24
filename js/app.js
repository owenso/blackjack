console.log("App Loaded")

window.onload = function(){
}

var myFirebaseRef = new Firebase("https://owens-blackjack.firebaseio.com/");
myFirebaseRef.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});


//shuffles card array
var shuffling = function(){
	return deck.sort(function() { return 0.5 - Math.random() });

};

//saves shuffled card array as new variable
var shuffled = shuffling();