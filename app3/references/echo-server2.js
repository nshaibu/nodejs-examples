const net = require('net');

net.createServer(function (socket) {
	socket.once('data', function(data) {
		socket.write(data);
	})
}).listen(4200, () => console.log("Once echo server listening on port 4200"));