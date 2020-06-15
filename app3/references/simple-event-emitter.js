const event = require('events');

let channel = new event.EventEmitter();

channel.on('join', function() { console.log("Hello world"); });
channel.emit('join');
channel.emit('join');
channel.emit('join');
channel.emit('join');
