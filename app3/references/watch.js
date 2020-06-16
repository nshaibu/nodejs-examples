const events = require('events');
const fs = require('fs');


class Watcher extends events.EventEmitter {
	constructor(watchDir, processedDir) {
		super();
		this.watchDir = watchDir;
		this.processedDir = processedDir;
	}

	watch() {
		let watcher = this;
		fs.readdir(this.watchDir, function (err, files) {
			if (err) throw err;
			for (let index in files) { watcher.emit('process', files[index]); }
		});
	}

	start() {
		console.log(`Watching folder: ${this.watchDir}`);
		let watcher = this;
		fs.watchFile(this.watchDir, function () {
			watcher.watch();
		});
	}
}

let watcher = new Watcher('./watch/', './watch/');
watcher.on('process', function(file) {
	let watchFile = this.watchDir + file;
	let processedFile = this.processedDir + file.toLowerCase();

	fs.rename(watchFile, processedFile, function (err) {
		if (err) throw err;
	});
});

watcher.start();