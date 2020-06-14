let Currency = function() {
	this.canadianDollar = 0.91;
}

Currency.prototype.roundTwoDecimals = function(amount) {
	return Math.round(amount * 100) / 100;
}

Currency.prototype.canadianToUS = function(canadian) {
	return this.roundTwoDecimals(canadian * this.canadianDollar);
}

Currency.prototype.USToCanadian = function(us) {
	return this.roundTwoDecimals(us / this.canadianDollar);
}

module.exports = Currency;