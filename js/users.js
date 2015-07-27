function User(name, numberino) {
    this.name = name;
    this.bank = 10000;
    this.bet = 0;
    this.hand = [];
    this.hand2 = [];
    this.handVal = [];
    this.splitHandVal = [];
    this.busted = false;
    this.blackjack = false;
    this.won = false;
    this.lost = false;
    this.push = false;
    this.turn = false;
    this.betting = function(amnt) {
        this.bet += amnt;
        this.bank = this.bank - this.bet;
        playerDataRef.update({
            bank: this.bank,
            bet: this.bet
        });
    };
    this.hit = function() {
        console.log("hitting")

        var deal = shuffled.splice(0, 1);
        // var deal = [deck[0]]//////*****************FOR TESTING ACES ************

        //Checks to see if new card is an Ace
        if (deal[0].abrv == 'A') {
            console.log("New Card Ace")

            //Checks to see if you already have one Ace. If you have an Ace, handVal[0] will bust if you take 11 and handVal[1] will be equal to what handVal[0] was originally anyway, so it adds 1 and 11 to the second hand total
            if (this.handVal.length == 2) {
                this.handVal[0] = this.handVal[1] + 11;
                this.handVal[1] = this.handVal[1] + 1;
            }
            //If you do not have an Ace, it creates two options for aces
            else {
                this.handVal[1] = this.handVal[0] + 1;
                this.handVal[0] = this.handVal[0] + 11;
            }
        } else {
            if (this.handVal.length == 2) {
                this.handVal[0] = this.handVal[0] + deal[0].value;
                this.handVal[1] = this.handVal[1] + deal[0].value;
            } else {
                this.handVal[0] = this.handVal[0] + deal[0].value;
            }
        }
        tellCard = deal[0].card;
        this.hand.push(deal[0]);
        playerDataRef.update({
            hand: player[myNumber].hand,
            handVal: player[myNumber].handVal
        });
        this.checkFunc(tellCard);



        //Adds card to DOM
        playerHitDOM();

    };
    this.checkFunc = function(x) {
        for (var i = 0; i < this.handVal.length; i++) {

            if (this.handVal[i] == 21) {
                console.log(this.name + " got the " + x + " and has Blackjack")
                this.blackjack = true;
                this.winCondition();

            } else if (this.handVal[i] > 21) {
                console.log(this.name + " got the " + x + " and Busts")
                    //If a user with an Ace Busts, the busted ace condition is removed
                if (this.handVal.length == 2) {
                    console.log(this.handVal[i] + " is over 21 and is no longer being counted")
                    var removed = this.handVal.splice(i, 1);
                    console.log(removed)
                    playerDataRef.update({
                        hand: this.hand
                    })
                } else {
                    this.busted = true;
                    this.winCondition();
                    nextTurn();

                }
            } else {
                console.log(this.name + " got the " + x + " and has " + this.handVal[i])
            }
        }
        playerDataRef.update({
            blackjack: this.blackjack,
            busted: this.busted
        })
    };
    this.winCondition = function() {
        if (this.busted) {
            console.log(this.name + " busted");
            this.win = false;
            this.lost = true;
            this.push = false;
        } else if ((dealer.busted == true) && (this.handVal[0] <= 21)) {
            console.log(this.name + ", dealer Busts, you win");
            this.won = true;
            this.lost = false;
            this.push = false;
            this.bank = this.bank + this.bet + this.bet;
        } else if ((dealer.blackjack == true) && (this.blackjack == true)) {
            console.log(this.name + " - push")
            this.push = true;
            this.lost = false;
            this.won = false;
            this.bank = this.bank + this.bet;

        } else if ((dealer.blackjack == true) && (this.blackjack == false)) {
            console.log(this.name + ", dealer Blackjack. You Lose");
            this.won = false;
            this.lost = true;
            this.push = false;
        } else if (this.blackjack) {
            console.log(this.name + " - Blackjack, you win!");
            this.won = true;
            this.lost = false;
            this.push = false;
            this.bank = this.bank + this.bet + (this.bet * 1.5);
            nextTurn();


        } else if (this.handVal[0] > dealer.handVal) {
            console.log("Dealer has " + dealer.handVal + " and " + this.name + " has " + this.handVal[0]);
            this.won = true;
            this.lost = false;
            this.push = false;
            this.bank = this.bank + this.bet + this.bet;
        } else if (this.handVal[0] < dealer.handVal) {
            console.log("Dealer has " + dealer.handVal + " and " + this.name + " has " + this.handVal[0]);
            this.won = false;
            this.lost = true;
            this.push = false;
        } else if (this.handVal[0] == dealer.handVal) {
            console.log(this.name + " - push");
            this.push = true;
            this.won = false;
            this.lost = false;
            this.bank = this.bank + this.bet;
        }


        playerDataRef.update({
            push: this.push,
            won: this.won,
            lost: this.lost,
            bank: this.bank
        })
        betDataRef.child(myNumber).remove();

    }
}



var colorGiver = function(numberino) {
    switch (numberino) {
        case 0:
            return 'blue'
            break;
        case 1:
            return 'red'
            break;
        case 2:
            return 'darkorange'
            break;
        case 3:
            return 'mediumorchid'
            break;
        case 4:
            return 'green'
            break;
        default:
            console.log("the colors fucked up")
    }
}

var dealer = {
    hand: [],
    handVal: 0,
    busted: false,
    blackjack: false,
    push: false,
    hit: function() {
        console.log("hitting")

        var deal = shuffled.splice(0, 1);

        if (deal[0].abrv == 'A') {
            if ((this.handVal + 11) > 21) {
                deal[0].value = 1
                console.log("Ace low")
            } else {
                deal[0].value = 11;
                console.log("Ace high")

            }
        }
        this.handVal = this.handVal + deal[0].value
        this.hand.push(deal[0])
        dealerHitDOM();

    },
    dealerCheck: function() {
        while (this.handVal < 18) {
            this.hit();
        };
        this.checkFunc();
        this.dealerUpload();
    },
    checkFunc: function() {

        if (this.handVal == 21) {
            console.log("Dealer Blackjack")
            this.blackjack = true;
        } else if (this.handVal > 21) {
            console.log("Dealer Busts")
            this.busted = true;
        } else {
            console.log("Dealer has " + this.handVal)
        }
    },
    winCondition: function() {
        for (var i = 0; i < player.length; i++) {
            if (this.busted) {
                return false;
            } else if (this.blackjack) {
                return true;
            } else if (this.handVal > player[i].handVal[0]) {
                console.log("Dealer has " + this.handVal + " and " + player[i] + " has " + player[i].handVal[0]);
                return false;
            }
        }
    },
    dealerUpload: function() {
        dealerDataRef.update({
            userId: 'dealer',
            name: 'dealer',
            push: this.push,
            busted: this.busted,
            blackjack: this.blackjack,
            hand: this.hand,
            handVal: this.handVal
        });
    }


};


var player = [];
