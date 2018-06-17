http = require('http');
var messages = [];

server = http.createServer(function(req, res){
	if (req.method == "POST"){
		var body = '';
		req.on('data', function (data) { //сбор информации, она может идти кусками
						body += data;
		});
		req.on('end', function () { //приехали все данные
				//console.log("Body: " + body); //выводим
				var data = JSON.parse(body);
				if (data.action == 'ADD_MESSAGE'){
						//сохраняем новое сообщение
						delete data.action;
						messages.push(data);
						console.log(messages);//убеждаемся, что все сохранилось
						res.end(JSON.stringify({status: 'ok'}));
				}
				else {
						console.log('UNKNOWN ACTION');
						console.log(data);
				}
				if (data.action == 'GET_MESSAGES'){
					res.end(JSON.stringify({status: 'ok', data: messages})); //выдача сообщений в клиент
				}
			});

//колдунство, которое позволяет обращаться к нашему серверу откуда угодно (с любого другого домена)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, {'Content-Type': 'text/json'});
    }
});

//localhost:3000
port = 3000;
host = '0.0.0.0';
server.listen(port, host);
console.log("Listen...");