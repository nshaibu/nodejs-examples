const url = require('url');

const _url = new URL('http://hello.com/hello/hello.txt');
console.log(_url.href);
console.log(_url.toString());
console.log(_url.host);
console.log(_url.hostname);
console.log(_url.pathname);