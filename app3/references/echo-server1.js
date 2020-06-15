const net = require('net');

net.createServer(function (socket) {
	socket.on('data', function (data) {
		socket.write(data);
	})
}).listen(4200, () => console.log("Echo server listening on port 4200"));