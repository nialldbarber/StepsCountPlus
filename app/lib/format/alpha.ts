export function capitaliseFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeDashes(str: string) {
	return str.replaceAll("-", " ");
}
