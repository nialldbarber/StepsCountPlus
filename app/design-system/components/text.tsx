import { colors, type Colors } from "@/app/design-system/colors";
import {
	typeHierarchy,
	type FontSizes,
	type TextTypes,
} from "@/app/design-system/font-size";
import type { FontWeight } from "@/app/design-system/font-weight";
import { fontWeight } from "@/app/design-system/font-weight";
import { maxFontSizeMultiplier } from "@/app/design-system/max-font-size";
import { renderStringWithEmoji } from "@/app/design-system/render-emoji";
import type { TextProps as NativeTextProps, TextStyle } from "react-native";
import { Text as NativeText } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type BaseTextProps = {
	size?: FontSizes;
	weight?: FontWeight;
	level?: TextTypes;
	color?: Colors;
	textStyles?: TextStyle;
	withEmoji?: boolean;
	a11yHint?: string;
};

export interface TextProps extends NativeTextProps, BaseTextProps {}

export function Text({
	weight = "medium",
	level = "text",
	size = level === "heading" ? "18px" : "16px",
	color,
	withEmoji = false,
	a11yHint,
	textStyles,
	children,
}: TextProps) {
	const { styles } = useStyles(stylesheet);

	return (
		<NativeText
			// @ts-expect-error
			style={[styles.text(size, level, weight, color), { ...textStyles }]}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
			accessibilityRole={level === "heading" ? "header" : "text"}
			accessibilityHint={a11yHint}
		>
			{withEmoji ? renderStringWithEmoji(children) : children}
		</NativeText>
	);
}

// @ts-expect-error
const stylesheet = createStyleSheet((theme) => ({
	text: (
		size: FontSizes,
		level: TextTypes,
		weight: FontWeight,
		color: Colors,
	) => ({
		...(level === "heading"
			? typeHierarchy.heading[size]
			: typeHierarchy.text[size]),
		fontFamily: fontWeight[weight],
		color: color ? colors[color] : theme.colors.textColor,
	}),
}));
