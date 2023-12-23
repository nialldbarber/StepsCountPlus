export function readableDate(isoStr: string) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(isoStr);
	const day = date.getDate();
	const month = months[date.getMonth()];
	const ordinal = getOrdinal(day);
	const year = date.getFullYear();

	return `${day}${ordinal} ${month} ${year}`;
}

export function getOrdinal(num: number) {
	const s = ["th", "st", "nd", "rd"];
	const v = num % 100;
	return s[(v - 20) % 10] || s[v] || s[0];
}
