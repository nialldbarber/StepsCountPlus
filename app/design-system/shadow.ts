import { colors } from "@/app/design-system/colors";

// @TODO: this default set up SUCKS
// look into how SwiftUI defaults work to try and match that
export const shadow = ({
	width = 0,
	height = 1,
	opacity = 0.08,
	radius = 5,
	elevation = 0.1,
}: {
	width?: number;
	height?: number;
	opacity?: number;
	radius?: number;
	elevation?: number;
} = {}) => ({
	shadowColor: colors.blackTwo,
	shadowOffset: {
		width,
		height,
	},
	shadowOpacity: opacity,
	shadowRadius: radius,
	elevation,
});
