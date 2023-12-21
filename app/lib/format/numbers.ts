export function formatNumber(num: number | string) {
	if (typeof num === "string") {
		return Intl.NumberFormat().format(Number(num));
	}
	return Intl.NumberFormat().format(num);
}

export function determinePercentage(percentage: number, target: number) {
	return ((percentage / target) * 100).toFixed(0);
}
