const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
	if (req.url  == '/') {
		fs.readFile('./titles.json', function (err, data) {
			if (err) {
				console.error(err);
				res.send('Server Error');
			} else {
				let titles = JSON.parse(data.toString());

				fs.readFile('./template.html', function (err, data) {
					if (err) {
						console.error(err);
						res.send('Server Error');
					} else {
						let tmpl = data.toString();

						let html = tmpl.replace('%', titles.join('</li><li>'));
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.end(html);
					}
				});
			} 
		});
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end('<h3>404 does not exist.</h3>');
	}
}).listen(4200, () => console.log("Server start on port 4200"));