const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');


let cache = {};

function send404(response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Error 404: response not found");
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serverStatic(response, cache, abspath) {
	if (cache[abspath]) {
		sendFile(response, abspath, cache[abspath])
	} else {
		fs.exists(abspath, function (exists) {
			if (exists) {
				fs.readFile(abspath, function(error, data) {
					if (error) {
						send404(response);
					} else {
						cache[abspath] = data;
						sendFile(response, abspath, data);
					}
 				})
			} else {
				send404(response);
			}
		})
	}
}


const server = http.createServer((request, response) => {
	let filePath = ""

	if (request.url == "/")
		filePath = "public/index.html";
	else 
		filePath = "public" + request.url;

	let abspath = path.join(__dirname, filePath);
	serverStatic(response, cache, abspath);
});

server.listen(5000, () => console.log("listen on port 5000"))