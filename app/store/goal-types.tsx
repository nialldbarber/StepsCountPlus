import { Text } from "../design-system/components/text";

export const goalTypes = [
	{
		id: 1,
		label: "Steps",
		view: "Steps",
		icon: <Text withEmoji>👟</Text>,
		selectedIcon: <Text withEmoji>👟</Text>,
	},
	{
		id: 2,
		label: "Flights",
		view: "Flights",
		icon: <Text withEmoji>🪜</Text>,
		selectedIcon: <Text withEmoji>🪜</Text>,
	},
	{
		id: 3,
		label: "Distance",
		view: "Distance",
		icon: <Text withEmoji>📍</Text>,
		selectedIcon: <Text withEmoji>📍</Text>,
	},
] as const;

export type Goals = (typeof goalTypes)[number]["view"];
