class Currency {
	constructor(){
		this.canadianDollar = 0.91;
	}

	roundTwoDecimals(amount) {
		return Math.round(amount * 100) / 100; 
	}

	canadianToUS(canadian) {
		return this.roundTwoDecimals(canadian * this.canadianDollar);
	}

	USToCanadian(us) {
		return this.roundTwoDecimals(us / this.canadianDollar);
	}
}

exports.Currency = Currency