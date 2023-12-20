export function capitaliseFirstLetter(str: string) {
	const formatted = str.split("");
	const first = formatted.at(0).toUpperCase();
	const rest = formatted.slice(1);
	const whole = [...first, ...rest].join("");
	return whole;
}
