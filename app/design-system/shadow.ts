// @TODO: this default set up SUCKS

import { colors } from "./colors";

// look into how SwiftUI defaults work to try and match that
export const shadow = ({
	width = 0,
	height = 1,
	opacity = 0.17,
	radius = 6,
	elevation = 0.5,
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
