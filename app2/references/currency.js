let canadianDollar = 0.91;

function roundTwoDecimals(amount) {
	return Math.round(amount * 100) / 100;
}

exports.canadianToUS = (canadian) => { return roundTwoDecimals(canadian * canadianDollar);};

exports.USToCanadian = (us) => { return roundTwoDecimals(us / canadianDollar); };