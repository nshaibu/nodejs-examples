const Currency = require('../prototype_currency');

let currency = new Currency();

console.log(currency.canadianToUS(50));
console.log(currency.USToCanadian(30));