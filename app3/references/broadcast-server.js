const net = require('net');
const events = require('events');

let channel = new events.EventEmitter();

channel.setMaxListeners(100);

channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
	this.emit("broadcast", "", `Users: ${this.listeners('broadcast').length}`);
	client.write(`Welcome: ${id}`);

	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message){
		 if (senderId != id) { this.clients[id].write(message); }
	};
	this.on('broadcast', this.subscriptions[id]);
	console.log(this.clients);
});

channel.on('leave', function (id) {
	channel.removeListener('broadcast', this.subscriptions[id]);
	channel.emit('broadcast', "", `${id} left`);
});

channel.on('shutdown', function () {
	channel.emit("broadcast", "", "Chat shutdown");
	channel.removeAllListeners("broadcast");
});

net.createServer(function (socket) {
	let id = socket.remoteAddress + ':' + socket.remotePort;

	socket.on('connection', function () { channel.emit('join', id, socket); });

	socket.on('data', function(data) { 
		var data = data.toString();
		if (data == "shutdown\r\n")
			channel.emit('shutdown');
		channel.emit('broadcast', id, data);
	});

	socket.on('close', function () { channel.emit('leave',  id); });

	socket.on('end', function () { channel.emit('leave', id); }) 

}).listen(4200, () => console.log("broadcast server listening on port 4200"));