const currency = require('../es6_currency');

c = new currency.Currency();
console.log(c.canadianToUS(50));
console.log(c.USToCanadian(30));