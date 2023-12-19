export function formatNumber(num: number | string) {
	if (typeof num === "string") {
		return Intl.NumberFormat().format(Number(num));
	}
	return Intl.NumberFormat().format(num);
}
