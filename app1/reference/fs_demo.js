const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, '/test'), {}, err => {
// 	if (err) throw err;
// 	console.log("folder created");
// });

// fs.writeFile(
// 	path.join(__dirname, '/test', 'hello.txt'),
// 	 "Hello World",
// 	  (err) => {
// 	  	if (err) throw err;

// 	  	fs.appendFile(path.join(__dirname, '/test', 'hello.txt'),
// 	  	 "Another text", (err) => {
// 	  	 	if (err) throw err;
// 	  	 });
// });

fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8',
 (err, data) => {
 	if (err) throw err;
 	console.log(data);
 });