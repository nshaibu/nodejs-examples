const http = require('http');
const fs = require('fs');

server = http.createServer();
server.on('request', (req, res) => {
	res.writeHead(200, {'content-Type': 'text/plain'});
	fs.createReadStream('./data_stream.js').pipe(res);
});

server.listen(5000, () => console.log("Server listening on port 5000"));