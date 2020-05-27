const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
	let filePath = path.join(__dirname, 'public', (req.url == '/') ? 'index.html' : req.url);
	console.log(filePath);
	
	let extname = path.extname(filePath);
	
	let contentType = 'text/html'

	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpeg':
			contentType = 'image/jpeg';
			break;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			switch (err.code) {
				case 'ENOENT':
					fs.readFile(path.join(__dirname, 'public', '404.html'), 
						(err, data) => {
							res.writeHead(200, {'Content-Type': 'text/html'});
					 		res.end(data, 'utf8');
					 	});
					break;
				default:
					res.writeHead(500);
					res.end(`Server error ${err.code}`)
			}
		} else {
			res.writeHead(200, {"content-type": contentType});
			res.end(data, 'utf8');
		}
	});	
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
