var usersRef = new Firebase('https://owens-blackjack.firebaseio.com/blackjack/users');




function User(name){
	this.name = name;
	this.bank = 1000;
	this.bet = 0;
	this.hand = [];
	this.hand2 = [];
	this.handVal = [];
	this.splitHandVal = [];
	this.hit = function() {
			console.log("hitting")

			var deal = shuffled.splice(0,1)

			//Checks to see if new card is an Ace
			if (deal[0].abrv == 'A'){
				console.log("New Card Ace")
				//Checks to see if you already have 2 Aces
				if((this.hand[0].abrv == 'A')&&(this.hand[1].abrv == 'A')){
					console.log("What the fuck, three aces?")
					this.handVal[0] = 3;
					this.handVal[1] = 13;
					this.handVal[2] = 14;
				}
				
				//Checks to see if you already one Ace. If you have an Ace, handVal[0] will bust if you take 11 and handVal[1] will be equal to what handVal[0] was originally anyway, so it adds 1 and 11 to the second hand total
				else if (this.handVal.length==2){
						this.handVal[0] = this.handVal[1] + 11;
						this.handVal[1] = this.handVal[1] + 1 ;
				}
				//If you do not have an Ace, it creates two options for aces
				else{
					this.handVal[0] = this.handVal[0] + 11;
					this.handVal[1] = this.handVal[0] + 1;	
				}
			}


			else{
				if (this.handVal.length==2){
					this.handVal[0] = this.handVal[0] + deal[0].value;
					this.handVal[1] = this.handVal[1] + deal[0].value;	
				}
				else{
					this.handVal = this.handVal + deal[0].value;
				}
			}	

				this.hand.push(deal[0]);
				this.checkFunc(deal[0]);
			};	
	this.checkFunc = function(x){
			for(var i=0; i<this.handVal.length;i++){

				if (this.handVal[i] == 21){
					console.log(this.name + " drew the " + x.name + " and has Blackjack")
				}
				else if (this.handVal[i]>21){
					console.log(this.name + " drew the " + x.name + " and Busts")
				}
				else{
					console.log(this.name + " drew the " + x.name + " and has " + this.handVal[i])
				}
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