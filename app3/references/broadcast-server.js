const net = require('net');
const events = require('events');

let channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
	console.log(client)
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message){
		 if (senderId != id) { this.clients[id].write(message); }
	};
	this.on('broadcast', this.subscriptions[id]);
	console.log(this.clients);
});

channel.on('leave', function (id) {
	channel.removeListener('broadcast', this.subscriptions[id]);
	channel.emit('broadcast', id, `${id} left`);
});

net.createServer(function (socket) {
	let id = socket.remoteAddress + ':' + socket.remotePort;

	socket.on('connect', function () { channel.emit('join', id, socket); });

	socket.on('data', function(data) { 
		var data = data.toString();
		console.log(data);
		channel.emit('broadcast', id, data);
	});

	socket.on('close', function () { channel.emit('leave',  id); })

}).listen(4200, () => console.log("broadcast. server listening on port 4200"));