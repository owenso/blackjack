###User Stories

- Players log in --Firebase

-player objects are created with values for bankroll, hand1, hand2 (in case of splitting)

-Each starts with $1000 bankroll

-Shuffle Card array

-players make bets (gui or input...probably input)
	-deducted from player bankroll

-when all players have bet, game starts
-if user doesnt place bet in 30 seconds, they are removed

-Each player's array (and the dealer's array ) are assigned 2 cards from deck array

-users see dealers cards

-insurance is offered if necessary

-If dealer has blackjack, announce to chatbox, game over

-one by one, players are given option to hit, stand, double (split, if cards in array match each other)
	-if ace, value is an array with [11,1], users can choose which they want to play it as
	-if split, use hand2
	
-check for player blackjack - if so announce to chatbox - 

-check for player bust

-moves to next player once player chooses
	(using the firebase .on('value') listener 
	
-dealer assigned cards until values in dealer object total 17 or over 21 (dealer loses)

-if 21, dealer wins

- winners and losers announced 

-player wins, bet is added to their object's bankroll

-player hand objects are emptied

-card array is reset, reshuffled

-player given option to bet again



-Whole thing loops until player leaves