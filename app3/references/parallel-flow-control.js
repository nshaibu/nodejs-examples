const fs = require('fs');

class WordCounter {
	constructor(fileDir) {
		this.fileDir = fileDir;
		this.numOfCompletedTasks = 0;
		this.tasks = [];
		this.wordCounts = {};
	}

	checkIfComplete() {
		this.numOfCompletedTasks += 1;
		if (this.numOfCompletedTasks == this.tasks.length) {
			for (let index in this.wordCounts) 
				console.log(index + " : " + this.wordCounts[index]);
		}
	}

	countWordsInText(text) {
		let words = text.toString().toLowerCase().split(/\W+/).sort();
		for (let index in words) {
			let word = words[index]
			if (word) {
				this.wordCounts[word] = (this.wordCounts[word]) ? this.wordCounts[word] + 1 : 1
			}
		}
	}

	start() {
		let counter = this;
		
		fs.readdir(this.fileDir, function (err, files) {
			if (err) throw err;
			for (let index in files) {
				let _path = counter.fileDir + '/' + files[index];
				let stats = fs.statSync(_path);

				if (stats.isDirectory()) continue;

				let task = (function(file) {
					return function() {
						fs.readFile(file, 'utf8', function (err, data) {
							if (err) throw err;
							counter.countWordsInText(data);
							counter.checkIfComplete();	
						});
					}
				})(_path);

				counter.tasks.push(task);
			}
			
			for (let index in counter.tasks) 
				counter.tasks[index]();
		})
	}
}


const counter = new WordCounter('.');
counter.start();