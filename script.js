
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
		var messageDiv = document.getElementById('message');
		var nick = document.getElementById('nick');
		var chat = document.getElementById('chat');
		if (messageDiv.value) {
			var newLi = document.createElement('li');
			//newLi.innerHTML = "<span style='color:rgb("+ randomColor() +")'>" + nick.value +":</span> " + message.value;
			jsonPost('http://localhost:3000', {action: "ADD_MESSAGE", nick: nick.value, message: message.value}) //отправляем данные на адрес localhost:3000 с объектом с двумя ключами - data и time
			
			setInterval(() => {
				jsonPost('http://localhost:3000', {action: "GET_MESSAGES"}).then( data => {
					arrMsg.innerHTML = '';
					data.data.forEach(message => arrMsg.innerHTML += `<li><span>${message.nick}:</span>${message.message}</li>`)
					chat.scrollTop = chat.scrollHeight;
				});
			}, 2000)
			
			messageDiv.value = "";
			//arrMsg.appendChild(newLi);
			chat.scrollTop = chat.scrollHeight;
		}
	};

	function jsonPost(url, data) {
			return new Promise((resolve, reject) => {
					var x = new XMLHttpRequest();   
					x.onerror = () => reject(new Error('jsonPost failed'));
					x.open("POST", url, true);
					x.send(JSON.stringify(data));

					x.onreadystatechange = () => {
							if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
									resolve(JSON.parse(x.responseText));
							}
							else if (x.status != 200){
									reject(new Error('status is not 200'));
							}
					}
			})
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

