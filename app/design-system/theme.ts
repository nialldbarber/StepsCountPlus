import { colors } from "@/app/design-system/colors";
import { radius } from "@/app/design-system/radius";

export const lightTheme = {
	colors: {
		/**
		 * @type Text color
		 */
		textColor: colors.black,
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.whiteTwo,
		statsBottomSectionBackgroundColor: "pureWhite",
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.whiteThree,
		settingsCardBackgroundColor: colors.pureWhite,
		/**
		 * @type Bottom tabs
		 */
		bottomTabBackgroundColor: colors.pureWhite,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.black,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.black,
		bottomTabsTextActiveColor: colors.primary,
		/**
		 * @type Chip
		 */
		chipInactiveBackgroundColor: colors.pureWhite,
		chipActiveBackgroundColor: colors.primary,
		chipDarkInactiveBackgroundColor: colors.white,
		chipDarkActiveBackgroundColor: colors.primary,
		chipActiveColor: colors.pureWhite,
		chipInactiveColor: colors.pureWhite,
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
		/**
		 * @type Bottom tabs
		 */
		bottomTabsBackgroundColor: colors.pureWhite,
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
		 * @type Text color
		 */
		textColor: colors.white,
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.black,
		statsBottomSectionBackgroundColor: "black",
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.blackTwo,
		settingsCardBackgroundColor: colors.blackTwo,
		/**
		 * @type Bottom tabs
		 */
		bottomTabBackgroundColor: colors.pureWhite,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.white,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.white,
		bottomTabsTextActiveColor: colors.primary,
		/**
		 * @type Chip
		 */
		chipInactiveBackgroundColor: colors.pureWhite,
		chipActiveBackgroundColor: colors.primary,
		chipDarkInactiveBackgroundColor: colors.white,
		chipDarkActiveBackgroundColor: colors.primary,
		chipActiveColor: colors.pureWhite,
		chipInactiveColor: colors.black,
		/**
		 * @type Icons
		 */
		goBackStroke: colors.white,
		warningStroke: colors.destructive,
		warningText: colors.destructive,
		closeStroke: colors.pureWhite,
		settingsStroke: colors.white,
		settingsStrokeBackground: colors.blackTwo,
		plusStroke: colors.black,
		/**
		 * @type Button
		 */
		buttonPrimaryBackgroundColor: colors.primary,
		buttonPrimaryTextColor: colors.white,
		buttonSecondaryBackgroundColor: colors.secondary,
		buttonSecondaryTextColor: colors.black,
		/**
		 * @type Bottom tabs
		 */
		bottomTabsBackgroundColor: colors.black,
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
