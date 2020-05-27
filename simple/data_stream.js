const fs = require('fs');

const stream = fs.createReadStream('./hello_server.js');

stream.on('data', (data) => {
	console.log(data);
});

stream.on('end', () => {
	console.log('finished');
});