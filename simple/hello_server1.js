const http = require('http');

const server = http.createServer();
server.on('request', function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('hello world\n');
});
server.listen(5000, () => console.log('Server listening on port 5000'));