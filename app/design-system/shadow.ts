import { colors } from "@/app/design-system/colors";

export const shadow = ({
	width = 0,
	height = 1,
	opacity = 0.07,
	radius = 2.22,
	elevation = 2,
}: {
	width?: number;
	height?: number;
	opacity?: number;
	radius?: number;
	elevation?: number;
} = {}) => ({
	shadowColor: colors.black,
	shadowOffset: {
		width,
		height,
	},
	shadowOpacity: opacity,
	shadowRadius: radius,
	elevation,
});
