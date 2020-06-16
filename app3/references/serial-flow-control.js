const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');


let configFileName = './rss_feeds.txt';

function checkForRSSFile() {
	fs.exists(configFileName, function (exists) {
		if (!exists) return next(new Error("File not found."));
		next(null, configFileName);
	});
}

function readRSSFile(configFileName) {
	fs.readFile(configFileName, function (err, data) {
		if (err) return next(err);

		data = data.toString().replace(/^\s+|\s+$/g, '').split('\n');
		let random = Math.floor(Math.random() * data.length);
		next(null,  data[random]);
	})
}

function downloadRSSFeed(feedUrl) {
	request({uri: feedUrl}, function (err, response, body) {
		if (err) return next(err);
		if (response.statusCode != 200) return next(new Error("Status error" + response.statusCode));

		next(null, body);
	});
}

function parseRSSFeed(rss) {
	let handler = new htmlparser.RssHandler();
	let parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if (!handler.dom.items.length)
		return next(new Error("No rss items found"));

	let item = handler.dom.items.shift();
	console.log(item);
}


let tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

function next(err, result) {
	if (err) return err;

	let currentTask = tasks.shift();
	if (currentTask) currentTask(result);
}

next();