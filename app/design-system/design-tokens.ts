import { colors } from "@/app/design-system/colors";
import { radii } from "@/app/design-system/radii";

export const lightTheme = {
	colors: {
		/**
		 * @type Text color
		 */
		textColor: colors.black,
		settingsScreenTextInactive: colors.black,
		settingsScreenTextActive: colors.primary,
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.white,
		modalBackgroundColor: colors.pureWhite,
		// this is purposefully a string literal
		// as its value is passed as a prop to Layout
		statsBottomSectionBackgroundColor: "pureWhite",
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.pureWhite,
		settingsCardBackgroundColor: colors.pureWhite,
		cardPercentStroke: colors.primary,
		/**
		 * @type Bottom tabs
		 */
		bottomTabBackgroundColor: colors.pureWhite,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.black,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.black,
		bottomTabsTextActiveColor: colors.primary,
		bottomTabsSlidingBackgroundColor: colors.greyEight,
		/**
		 * @type Chip
		 */
		chipInactiveBackgroundColor: colors.pureWhite,
		chipActiveBackgroundColor: colors.primary,
		chipDarkInactiveBackgroundColor: colors.white,
		chipDarkActiveBackgroundColor: colors.primary,
		chipActiveColor: colors.pureWhite,
		chipInactiveColor: colors.black,
		chipChallengesBackground: colors.pureWhite,
		chipChallengesBorder: colors.white,
		chipChallengesActiveBorder: colors.primary,
		chipChallengesColor: colors.black,
		chipFilterBackground: colors.pureWhite,
		/**
		 * @type Donut
		 */
		donutBackgroundColor: colors.whiteTwo,
		/**
		 * @type Input
		 */
		inputActiveBackgroundColor: colors.white,
		inputInactiveBackgroundColor: colors.pureWhite,
		inputActiveBorderColor: colors.white,
		inputInactiveBorderColor: colors.white,
		inputIconColor: colors.black,
		inputPlaceholderColor: colors.black,
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
		infoStroke: colors.primary,
		trashIconStroke: colors.destructive,
		challengeConfigStroke: colors.greyFour,
		filterStroke: colors.black,
		/**
		 * @type Button
		 */
		buttonPrimaryBackgroundColor: colors.primary,
		buttonPrimaryTextColor: colors.white,
		buttonSecondaryBackgroundColor: colors.secondary,
		buttonSecondaryTextColor: colors.black,
		buttonSecondaryBorder: colors.primary,
		buttonTertiaryBackgroundColor: colors.secondary,
		buttonTertiaryTextColor: colors.white,
		buttonTertiaryBorder: colors.secondary,
		/**
		 * @type Table
		 */
		tableEvenBackgroundColor: colors.white,
		tableOddBackgroundColor: colors.pureWhite,
		/**
		 * @type Bottom tabs
		 */
		bottomTabsBackgroundColor: colors.pureWhite,
		/**
		 * @type Settings screen
		 */
		settingsScreenSeparatorColor: colors.white,
		/**
		 * @type Stats screen
		 */
		statsScreenChipBackgroundColor: colors.pureWhite,
		/**
		 * @type RAG
		 */
		cardSuccess: colors.success,
		cardWarning: colors.warning,
		cardError: colors.error,
		/**
		 * @type Chart
		 */
		chartBackgroundColor: colors.white,
		chartLabelColor: colors.black,
	},
	dimensions: {
		/**
		 * @type Button
		 */
		buttonBorderRadius: radii.full,
	},
} as const;

export const darkTheme = {
	colors: {
		/**
		 * @type Text color
		 */
		textColor: colors.white,
		settingsScreenTextInactive: colors.pureWhite,
		settingsScreenTextActive: colors.primary,
		/**
		 * @type Background colors
		 */
		screenBackgroundColor: colors.black,
		modalBackgroundColor: colors.black,
		// this is purposefully a string literal
		// as its value is passed as a prop to Layout
		statsBottomSectionBackgroundColor: "black",
		/**
		 * @type Card
		 */
		cardBackgroundColor: colors.blackTwo,
		settingsCardBackgroundColor: colors.blackTwo,
		cardPercentStroke: colors.primary,
		/**
		 * @type Bottom tabs
		 */
		bottomTabBackgroundColor: colors.blackTwo,
		bottomTabActiveTabBorder: colors.primary,
		bottomTabsIconStroke: colors.white,
		bottomTabsIconActiveStroke: colors.primary,
		bottomTabsTextColor: colors.white,
		bottomTabsTextActiveColor: colors.primary,
		bottomTabsSlidingBackgroundColor: colors.greySeven,
		/**
		 * @type Chip
		 */
		chipInactiveBackgroundColor: colors.pureWhite,
		chipActiveBackgroundColor: colors.primary,
		chipDarkInactiveBackgroundColor: colors.white,
		chipDarkActiveBackgroundColor: colors.primary,
		chipActiveColor: colors.pureWhite,
		chipInactiveColor: colors.black,
		chipChallengesBackground: colors.blackTwo,
		chipChallengesBorder: colors.blackTwo,
		chipChallengesActiveBorder: colors.primary,
		chipChallengesColor: colors.white,
		chipFilterBackground: colors.blackTwo,
		/**
		 * @type Donut
		 */
		donutBackgroundColor: colors.black,
		/**
		 * @type Input
		 */
		inputActiveBackgroundColor: colors.black,
		inputInactiveBackgroundColor: colors.blackTwo,
		inputActiveBorderColor: colors.blackTwo,
		inputInactiveBorderColor: colors.black,
		inputIconColor: colors.pureWhite,
		inputPlaceholderColor: colors.greyFour,
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
		infoStroke: colors.primary,
		trashIconStroke: colors.destructive,
		challengeConfigStroke: colors.greyFour,
		filterStroke: colors.greyFour,
		/**
		 * @type Button
		 */
		buttonPrimaryBackgroundColor: colors.primary,
		buttonPrimaryTextColor: colors.white,
		buttonSecondaryBackgroundColor: colors.blackTwo,
		buttonSecondaryTextColor: colors.pureWhite,
		buttonSecondaryBorder: colors.primary,
		buttonTertiaryBackgroundColor: colors.blackTwo,
		buttonTertiaryTextColor: colors.white,
		buttonTertiaryBorder: colors.blackTwo,
		/**
		 * @type Table
		 */
		tableEvenBackgroundColor: colors.black,
		tableOddBackgroundColor: colors.blackTwo,
		/**
		 * @type Bottom tabs
		 */
		bottomTabsBackgroundColor: colors.black,
		/**
		 * @type Settings screen
		 */
		settingsScreenSeparatorColor: colors.greyFour,
		/**
		 * @type Stats screen
		 */
		statsScreenChipBackgroundColor: colors.black,
		/**
		 * @type RAG
		 */
		cardSuccess: colors.success,
		cardWarning: colors.warning,
		cardError: colors.error,
		/**
		 * @type Chart
		 */
		chartBackgroundColor: colors.black,
		chartLabelColor: colors.white,
	},
	dimensions: {
		/**
		 * @type Button
		 */
		buttonBorderRadius: radii.full,
	},
} as const;

export type AppThemes = {
	light: typeof lightTheme;
	dark: typeof darkTheme;
};

// This enables auto-complete for the theme object
declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
}
