import { colors } from "@/app/design-system/colors";
import { AlignBottom, Ruler, StatusUp } from "iconsax-react-native";

export const goalTypes = [
	{
		id: 1,
		label: "Steps",
		view: "Steps",
		icon: <StatusUp color={colors.black} size={18} />,
	},
	{
		id: 2,
		label: "Flights",
		view: "Flights",
		icon: <AlignBottom color={colors.black} size={18} />,
	},
	{
		id: 3,
		label: "Distance",
		view: "Distance",
		icon: <Ruler color={colors.black} size={18} />,
	},
] as const;

export type Goals = (typeof goalTypes)[number]["view"];
