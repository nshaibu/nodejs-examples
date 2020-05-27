const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
	log(message) {
		this.emit("message", {id: uuid.v4(), message: message});
	}
}

module.exports = Logger;
