export function convertMetersToKm(value: number) {
	return Number((value / 1000).toFixed(2));
}

export function formatKms(value: number) {
	return `${value.toFixed(2)}km`;
}

export function convertMinutes(totalMinutes: number) {
	const days = Math.floor(totalMinutes / (60 * 24));
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
	const minutes = totalMinutes % 60;

	let result = "";
	if (days > 0) result += `${days}d `;
	if (hours > 0 || days > 0) result += `${hours}h `;
	if (minutes > 0) result += `${Math.round(minutes)}m`;

	return result.trim();
}

export function convertKmToMiles(km: number) {
	const milesPerKm = 0.621371;
	return km * milesPerKm;
}
