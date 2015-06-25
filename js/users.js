var usersRef = new Firebase('https://owens-blackjack.firebaseio.com/blackjack/users');




function User(name){
	this.name = name;
	this.bank = 1000;
	this.bet = 0;
	this.hand = [];
	this.hand2 = [];
	this.handVal = [];
	this.hit = function() {
				console.log("hitting")

				var deal = shuffled.splice(0,1)

				if (deal[0].abrv == 'A'){
					if ((this.handVal[0] + 11)>21){
						deal[0].value = 1
						console.log("Ace low")
					}
					else{
						deal[0].value = 11;	
						console.log("Ace high")
				
					}
				}
				this.handVal[0] = this.handVal[0] + deal[0].value;
				this.hand.push(deal[0]);

				this.checkFunc(0);
			};
	this.hitMore = function(n) {
				console.log("hitting")

				var deal = shuffled.splice(0,1)

				if (deal[0].abrv == 'A'){
					if ((this.handVal[n]+ 11)>21){
						deal[0].value = 1
						console.log("Ace low")
					}
					else{
						deal[0].value = 11;	
						console.log("Ace high")
				
					}
				}
				this.handVal[n] = this.handVal[n]+ deal[0].value;
				console.log(this.handVal[n])
				this.hand.push(deal[0]);


				this.checkFunc(n);
			};		
	this.checkFunc = function(n){

			if (this.handVal[n] == 21){
				console.log("Player Blackjack")
			}
			else if (this.handVal[n]>21){
				console.log("Player Busts")
			}
			else{
				console.log("Player has " + this.handVal[n])
			}
		}		
}


var dealer = {
	hand:[],
	handVal:0,
	hit: function() {
			console.log("hitting")

				var deal = shuffled.splice(0,1);


				if (deal[0].abrv == 'A'){
					if ((this.handVal + 11)>21){
						deal[0].value = 1
						console.log("Ace low")
					}
					else{
						deal[0].value = 11;	
						console.log("Ace high")
				
					}
				}
				this.handVal = this.handVal + deal[0].value
				this.hand.push(deal[0])	
			},
	dealerCheck : function(){
					while(this.handVal <18){
						this.hit();
					};
					this.checkFunc();
				},
	checkFunc : function(){

				if (this.handVal == 21){
					console.log("Dealer Blackjack")
				}
				else if (this.handVal>21){
					console.log("Dealer Busts")
				}
				else{
					console.log("Dealer has " + this.handVal)
				}
			}

}



var player=[];

for (var i=0;i<5;i++){
	 player[i]= new User ('placeholder-changeme_'+i);
}