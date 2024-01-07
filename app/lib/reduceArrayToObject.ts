// biome-ignore lint/suspicious/noExplicitAny: generic function, doesn't care about type
export function reduceArrayToObject(array: Array<any>) {
	return array.reduce(
		(acc, item) => Object.assign(Object.assign({}, acc), item),
		{},
	);
}
