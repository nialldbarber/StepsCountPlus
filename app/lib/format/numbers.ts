export function formatNumber(num: number | string, decimals = false) {
	const formattedNumber = typeof num === "string" ? Number(num) : num;
	return decimals
		? Intl.NumberFormat().format(formattedNumber)
		: Intl.NumberFormat().format(parseInt(formattedNumber.toString()));
}

export function formatNumberWithDecimals(num: number | string) {
	if (typeof num === "string") {
		return Intl.NumberFormat().format(Number(num));
	}
	return Intl.NumberFormat().format(num);
}

export function determinePercentage(percentage: number, target: number) {
	return ((percentage / target) * 100).toFixed(0);
}
