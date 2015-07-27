var myChatRef = new Firebase('https://owens-blackjack.firebaseio.com/chat');


myChatRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    usertextColor = colorGiver(snapshot.val().playernum);
    displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).css('color', usertextColor).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}
