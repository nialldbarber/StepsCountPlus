export function timeBasedGreeting() {
	const localTime = new Date();
	const hours = localTime.getHours();

	if (hours < 12) {
		return "Good morning";
	}
	if (hours < 18) {
		return "Good afternoon";
	}
	return "Good evening";
}
