import { useState } from "react";

export function useActiveValue(initialValue = 0) {
	const [value, setValue] = useState(initialValue);
	function handleActiveValue(selectedValue: number) {
		setValue(selectedValue);
	}

	return { value, handleActiveValue };
}
