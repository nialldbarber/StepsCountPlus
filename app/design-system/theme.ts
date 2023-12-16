import { colors } from "@/app/design-system/colors";
import { radius } from "@/app/design-system/radius";

export const lightTheme = {
	colors: {
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.whiteTwo,
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.whiteThree,
		/**
		 * @type Icons
		 */
		bottomTabBackgroundColor: colors.pureWhite,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.black,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.black,
		bottomTabsTextActiveColor: colors.primary,
		/**
		 * @type Icon
		 */
		goBackStroke: colors.black,
		warningStroke: colors.destructive,
		warningText: colors.destructive,
		closeStroke: colors.black,
		settingsStroke: colors.black,
		settingsStrokeBackground: colors.pureWhite,
		plusStroke: colors.black,
		/**
		 * @type Button
		 */
		buttonPrimaryBackgroundColor: colors.primary,
		buttonPrimaryTextColor: colors.white,
		buttonSecondaryBackgroundColor: colors.secondary,
		buttonSecondaryTextColor: colors.black,
	},
	dimensions: {
		/**
		 * @type Button
		 */
		buttonBorderRadius: radius.full,
	},
} as const;

export const darkTheme = {
	colors: {
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.black,
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.whiteThree,
		/**
		 * @type Icons
		 */
		bottomTabBackgroundColor: colors.pureWhite,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.black,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.black,
		bottomTabsTextActiveColor: colors.primary,
		/**
		 * @type Icons
		 */
		goBackStroke: colors.white,
		warningStroke: colors.destructive,
		warningText: colors.destructive,
		closeStroke: colors.black,
		settingsStroke: colors.white,
		settingsStrokeBackground: colors.black,
		plusStroke: colors.black,
		/**
		 * @type Button
		 */
		buttonPrimaryBackgroundColor: colors.primary,
		buttonPrimaryTextColor: colors.white,
		buttonSecondaryBackgroundColor: colors.secondary,
		buttonSecondaryTextColor: colors.black,
	},
	dimensions: {
		/**
		 * @type Button
		 */
		buttonBorderRadius: radius.full,
	},
} as const;

export type AppThemes = {
	light: typeof lightTheme;
	dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
}
