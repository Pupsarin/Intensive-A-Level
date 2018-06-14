
/**
 * Check if DOM fully loaded.
 */
var domReady = function(callback) {
	'use strict';
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
			callback();
	} else {
			document.addEventListener('DOMContentLoaded', callback);
	}
};

/** 
 * Main script
 */
domReady(function() {
	'use strict';

	var i = 5;
	var user = 'user';
	var send = document.getElementById('send');
	
	send.onclick = sendMessage;

/** 
 * On press of "Enter" button.
 * 
 * Execute sendMessege function.
 */
	document.querySelector('body').onkeydown = function(e) {
		if (e.keyCode == 13) {
			sendMessage(e);
		}
	};
	

/** 
 * Send a message to the bottom.
 *
 * Reset input field.
 * Generate username until backend part isn't active.
 */
	function sendMessage() {
		var arrMsg = document.getElementById('arrMsg');
		var message = document.getElementById('message');
		var chat = document.getElementById('chat');
		if (message.value) {
			var newLi = document.createElement('li');
			newLi.innerHTML = "<span style='color:rgb("+ randomColor() +")'>" + user + i +":</span> " + message.value;
			i++;
			message.value = "";
			arrMsg.appendChild(newLi);
			chat.scrollTop = chat.scrollHeight;
		}
	};

/** Generate random color.
 *  
 * Ensure that generated color wouldn't duplicate the previous one
 */
	function randomColor() {
		var colors = ['148, 0, 211','75, 0, 130', '0, 0, 255', '0, 255, 0', '255, 127, 0', '255, 0, 0'];
		var tagColorStyle = document.getElementById('arrMsg').lastElementChild.getElementsByTagName('SPAN')[0];
		var colour = window.getComputedStyle(tagColorStyle, null).color;
		do {
			var x = Math.floor(Math.random() * 6);
		}
		while ("rgb(" + colors[x] + ")" == colour);
		return colors[x];
	}
});

