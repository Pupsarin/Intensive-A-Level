
//Checks if DOM fully loaded.
var domReady = function(callback) {
	'use strict';
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
			callback();
	} else {
			document.addEventListener('DOMContentLoaded', callback);
	}
};

//Main script
domReady(function() {
	'use strict';

	var i = 5;
	var user = 'user';
	var send = document.getElementById('send');
	send.onclick = sendMessage;

// On press of "Enter" button.
// Execute sendMessege function.
	document.querySelector('body').onkeydown = function(e) {
		if (e.keyCode == 13) {
			sendMessage(e);
		}
	};
	

// Send a message to the bottom.
// Reset input field.
// Generate username until backend part isn't active.
	function sendMessage() {
		var arrMsg = document.getElementById('arrMsg');
		var message = document.getElementById('message');
		if (message.value) {
			var newLi = document.createElement('li');
			newLi.innerHTML = "<span>"+ user + i +":</span> " + message.value;
			i++;
			message.value = "";
			arrMsg.appendChild(newLi);
		}
	};
});

