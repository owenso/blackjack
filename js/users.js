function User(name){
	this.name = name;
	this.bank = 1000;
	this.hand1 = [];
	this.hand2 = [];
	this.auth = myFirebaseRef.getAuth();
}