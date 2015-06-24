console.log("Deck Loaded")

var deck = [
	{
	card:"Ace of Spades",
	abrv:"A",
	suit:"Spades",
	value:[11,1],
	facedown:true
	},
	{
	card:"King of Spades",
	abrv:"K",
	suit:"Spades",
	value:10,
	facedown:true
	},
	{
	card:"Queen of Spades",
	abrv:"Q",
	suit:"Spades",
	value:10,
	facedown:true
	},
	{
	card:"Jack of Spades",
	abrv:"J",
	suit:"Spades",
	value:10,
	facedown:true
	},
	{
	card:"Ten of Spades",
	abrv:"T",
	suit:"Spades",
	value:10,
	facedown:true
	},
	{
	card:"Nine of Spades",
	abrv:"9",
	suit:"Spades",
	value:9,
	facedown:true
	},
	{
	card:"Eight of Spades",
	abrv:"8",
	suit:"Spades",
	value:8,
	facedown:true
	},
	{
	card:"Seven of Spades",
	abrv:"7",
	suit:"Spades",
	value:7,
	facedown:true
	},
	{
	card:"Six of Spades",
	abrv:"6",
	suit:"Spades",
	value:6,
	facedown:true
	},
	{
	card:"Five of Spades",
	abrv:"5",
	suit:"Spades",
	value:5,
	facedown:true
	},
	{
	card:"Four of Spades",
	abrv:"4",
	suit:"Spades",
	value:4,
	facedown:true
	},
	{
	card:"Three of Spades",
	abrv:"3",
	suit:"Spades",
	value:3,
	facedown:true
	},
	{
	card:"Two of Spades",
	abrv:"2",
	suit:"Spades",
	value:2,
	facedown:true
	},
	{
	card:"Ace of Clubs",
	abrv:"A",
	suit:"Clubs",
	value:[11,1],
	facedown:true
	},
	{
	card:"King of Clubs",
	abrv:"K",
	suit:"Clubs",
	value:10,
	facedown:true
	},
	{
	card:"Queen of Clubs",
	abrv:"Q",
	suit:"Clubs",
	value:10,
	facedown:true
	},
	{
	card:"Jack of Clubs",
	abrv:"J",
	suit:"Clubs",
	value:10,
	facedown:true
	},
	{
	card:"Ten of Clubs",
	abrv:"T",
	suit:"Clubs",
	value:10,
	facedown:true
	},
	{
	card:"Nine of Clubs",
	abrv:"9",
	suit:"Clubs",
	value:9,
	facedown:true
	},
	{
	card:"Eight of Clubs",
	abrv:"8",
	suit:"Clubs",
	value:8,
	facedown:true
	},
	{
	card:"Seven of Clubs",
	abrv:"7",
	suit:"Clubs",
	value:7,
	facedown:true
	},
	{
	card:"Six of Clubs",
	abrv:"6",
	suit:"Clubs",
	value:6,
	facedown:true
	},
	{
	card:"Five of Clubs",
	abrv:"5",
	suit:"Clubs",
	value:5,
	facedown:true
	},
	{
	card:"Four of Clubs",
	abrv:"4",
	suit:"Clubs",
	value:4,
	facedown:true
	},
	{
	card:"Three of Clubs",
	abrv:"3",
	suit:"Clubs",
	value:3,
	facedown:true
	},
	{
	card:"Two of Clubs",
	abrv:"2",
	suit:"Clubs",
	value:2,
	facedown:true
	},
	{
	card:"Ace of Hearts",
	abrv:"A",
	suit:"Hearts",
	value:[11,1],
	facedown:true
	},
	{
	card:"King of Hearts",
	abrv:"K",
	suit:"Hearts",
	value:10,
	facedown:true
	},
	{
	card:"Queen of Hearts",
	abrv:"Q",
	suit:"Hearts",
	value:10,
	facedown:true
	},
	{
	card:"Jack of Hearts",
	abrv:"J",
	suit:"Hearts",
	value:10,
	facedown:true
	},
	{
	card:"Ten of Hearts",
	abrv:"T",
	suit:"Hearts",
	value:10,
	facedown:true
	},
	{
	card:"Nine of Hearts",
	abrv:"9",
	suit:"Hearts",
	value:9,
	facedown:true
	},
	{
	card:"Eight of Hearts",
	abrv:"8",
	suit:"Hearts",
	value:8,
	facedown:true
	},
	{
	card:"Seven of Hearts",
	abrv:"7",
	suit:"Hearts",
	value:7,
	facedown:true
	},
	{
	card:"Six of Hearts",
	abrv:"6",
	suit:"Hearts",
	value:6,
	facedown:true
	},
	{
	card:"Five of Hearts",
	abrv:"5",
	suit:"Hearts",
	value:5,
	facedown:true
	},
	{
	card:"Four of Hearts",
	abrv:"4",
	suit:"Hearts",
	value:4,
	facedown:true
	},
	{
	card:"Three of Hearts",
	abrv:"3",
	suit:"Hearts",
	value:3,
	facedown:true
	},
	{
	card:"Two of Hearts",
	abrv:"2",
	suit:"Hearts",
	value:2,
	facedown:true
	},
	{
	card:"Ace of Diamonds",
	abrv:"A",
	suit:"Diamonds",
	value:[11,1],
	facedown:true
	},
	{
	card:"King of Diamonds",
	abrv:"K",
	suit:"Diamonds",
	value:10,
	facedown:true
	},
	{
	card:"Queen of Diamonds",
	abrv:"Q",
	suit:"Diamonds",
	value:10,
	facedown:true
	},
	{
	card:"Jack of Diamonds",
	abrv:"J",
	suit:"Diamonds",
	value:10,
	facedown:true
	},
	{
	card:"Ten of Diamonds",
	abrv:"T",
	suit:"Diamonds",
	value:10,
	facedown:true
	},
	{
	card:"Nine of Diamonds",
	abrv:"9",
	suit:"Diamonds",
	value:9,
	facedown:true
	},
	{
	card:"Eight of Diamonds",
	abrv:"8",
	suit:"Diamonds",
	value:8,
	facedown:true
	},
	{
	card:"Seven of Diamonds",
	abrv:"7",
	suit:"Diamonds",
	value:7,
	facedown:true
	},
	{
	card:"Six of Diamonds",
	abrv:"6",
	suit:"Diamonds",
	value:6,
	facedown:true
	},
	{
	card:"Five of Diamonds",
	abrv:"5",
	suit:"Diamonds",
	value:5,
	facedown:true
	},
	{
	card:"Four of Diamonds",
	abrv:"4",
	suit:"Diamonds",
	value:4,
	facedown:true
	},
	{
	card:"Three of Diamonds",
	abrv:"3",
	suit:"Diamonds",
	value:3,
	facedown:true
	},
	{
	card:"Two of Diamonds",
	abrv:"2",
	suit:"Diamonds",
	value:2,
	facedown:true
	}
]