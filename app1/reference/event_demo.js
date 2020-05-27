const EventEmitter = require('events');

class MyEvent extends EventEmitter {}

const myEvent = new MyEvent();
myEvent.on('event', event => {console.log(event + "Fired")});
myEvent.emit('event');