import type { Colors } from "@/app/design-system/colors";
import { colors } from "@/app/design-system/colors";
import type { Radii } from "@/app/design-system/radii";
import { radii } from "@/app/design-system/radii";
import { shadow as coreShadow } from "@/app/design-system/shadow";
import type { Height, Width } from "@/app/design-system/size";
import { heights, widths } from "@/app/design-system/size";
import type { NegativeSpace, Space } from "@/app/design-system/space";
import { space } from "@/app/design-system/space";
import type { NegativeZIndex, ZIndex } from "@/app/design-system/z-index";
import { zIndex } from "@/app/design-system/z-index";
import type { A11y } from "@/app/types/a11y";
import type {
	AlignItems,
	AlignSelf,
	BorderStyle,
	FlexDirection,
	FlexWrap,
	JustifyContent,
	Overflow,
	Position,
} from "@/app/types/styles";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import type { AccessibilityRole, ViewStyle } from "react-native";
import { View } from "react-native";

/**
 * A note on the undefined values in the
 * useMemo dependency array: I'd rather they
 * had no value, than give each one an
 * arbitrary value. This way, if the value
 * is undefined, it will be ignored
 */

export function resolveToken<TokenName extends string, TokenValue, CustomValue>(
	scale: Record<TokenName, TokenValue>,
	value: TokenName | { custom: CustomValue } | undefined,
) {
	return value
		? typeof value === "object"
			? value.custom
			: scale[value]
		: undefined;
}

function isColorKey(key: string): key is Colors {
	return key in colors;
}

export type BoxProps = {
	a11yRole?: AccessibilityRole;
	alignSelf?: AlignSelf;
	alignItems?: AlignItems;
	borderWidth?: number;
	borderStyle?: BorderStyle;
	borderColor?: Colors;
	borderRadius?: Radii;
	borderTopLeftRadius?: Radii;
	borderTopRightRadius?: Radii;
	borderBottomLeftRadius?: Radii;
	borderBottomRightRadius?: Radii;
	bottom?: Space;
	flex?: number;
	flexBasis?: number | string;
	flexDirection?: FlexDirection;
	flexGrow?: 0 | 1;
	flexShrink?: 0 | 1;
	flexWrap?: FlexWrap;
	rowGap?: Space;
	columnGap?: Space;
	gap?: Space;
	left?: Space;
	justifyContent?: JustifyContent;
	margin?: Space | NegativeSpace;
	marginBottom?: Space | NegativeSpace;
	marginHorizontal?: Space | NegativeSpace;
	marginLeft?: Space | NegativeSpace;
	marginRight?: Space | NegativeSpace;
	marginTop?: Space | NegativeSpace;
	marginVertical?: Space | NegativeSpace;
	minHeight?: Space;
	maxHeight?: Space;
	padding?: Space;
	paddingBottom?: Space;
	paddingHorizontal?: Space;
	paddingLeft?: Space;
	paddingRight?: Space;
	paddingTop?: Space;
	paddingVertical?: Space;
	position?: Position;
	right?: Space;
	top?: Space;
	height?: Height | Space;
	width?: Width | Space;
	overflow?: Overflow;
	backgroundColor?: Colors | string;
	styles?: ViewStyle;
	shadow?: boolean;
	zIndex?: ZIndex | NegativeZIndex;
} & (
	| {
			borderBottomRadius?: number;
			borderLeftRadius?: never;
			borderRightRadius?: never;
			borderTopRadius?: number;
	  }
	| {
			borderBottomRadius?: never;
			borderLeftRadius?: number;
			borderRightRadius?: number;
			borderTopRadius?: never;
	  }
) &
	(
		| {
				background?: Colors;
		  }
		| {
				background: Colors;
		  }
	) &
	Partial<A11y>;

export function Box({
	a11yRole,
	a11yLabel,
	a11yHint,
	alignSelf,
	alignItems,
	borderStyle,
	borderWidth,
	borderColor,
	borderRadius,
	borderBottomRadius,
	borderLeftRadius,
	borderTopLeftRadius,
	borderTopRightRadius,
	borderBottomLeftRadius,
	borderBottomRightRadius,
	borderRightRadius,
	borderTopRadius,
	bottom,
	flex,
	flexBasis,
	flexDirection,
	flexGrow,
	flexShrink,
	flexWrap,
	rowGap,
	columnGap,
	gap,
	left,
	justifyContent,
	minHeight,
	maxHeight,
	margin,
	marginBottom,
	marginHorizontal,
	marginLeft,
	marginRight,
	marginTop,
	marginVertical,
	padding,
	paddingBottom,
	paddingHorizontal,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingVertical,
	position,
	right,
	top,
	styles: customStyles,
	width: _width,
	height: _height,
	overflow,
	backgroundColor,
	zIndex: _zIndex,
	shadow = false,
	children,
}: PropsWithChildren<BoxProps>) {
	const width = resolveToken({ ...widths, ...space }, _width);
	const height = resolveToken({ ...heights, ...space }, _height);

	const styles = useMemo(() => {
		return {
			alignSelf,
			alignItems,
			borderWidth,
			borderStyle,
			borderColor: colors[borderColor],
			borderBottomLeftRadius:
				radii[borderBottomLeftRadius] ??
				radii[borderBottomRadius] ??
				radii[borderLeftRadius] ??
				radii[borderRadius],
			borderBottomRightRadius:
				radii[borderBottomRightRadius] ??
				radii[borderBottomRadius] ??
				radii[borderRightRadius] ??
				radii[borderRadius],
			borderTopLeftRadius:
				radii[borderTopLeftRadius] ??
				radii[borderTopRadius] ??
				radii[borderLeftRadius] ??
				radii[borderRadius],
			borderTopRightRadius:
				radii[borderTopRightRadius] ??
				radii[borderTopRadius] ??
				radii[borderRightRadius] ??
				radii[borderRadius],
			flex,
			flexBasis,
			flexDirection,
			flexGrow,
			flexShrink,
			flexWrap,
			rowGap: space[rowGap],
			columnGap: space[columnGap],
			gap: space[gap],
			justifyContent,
			minHeight: space[minHeight],
			maxHeight: space[maxHeight],
			margin: space[margin],
			marginBottom: space[marginBottom],
			marginHorizontal: space[marginHorizontal],
			marginLeft: space[marginLeft],
			marginRight: space[marginRight],
			marginTop: space[marginTop],
			marginVertical: space[marginVertical],
			padding: space[padding],
			paddingBottom: space[paddingBottom],
			paddingHorizontal: space[paddingHorizontal],
			paddingLeft: space[paddingLeft],
			paddingRight: space[paddingRight],
			paddingTop: space[paddingTop],
			paddingVertical: space[paddingVertical],
			position,
			top: space[top],
			right: space[right],
			left: space[left],
			bottom: space[bottom],
			height,
			width,
			overflow,
			backgroundColor: isColorKey(backgroundColor)
				? colors[backgroundColor]
				: backgroundColor,
			zIndex: zIndex[_zIndex],
		};
	}, [
		alignSelf,
		flex,
		alignItems,
		borderWidth,
		borderStyle,
		borderColor,
		borderBottomLeftRadius,
		borderBottomRadius,
		borderBottomRightRadius,
		borderLeftRadius,
		borderRadius,
		borderRightRadius,
		borderTopLeftRadius,
		borderTopRadius,
		borderTopRightRadius,
		bottom,
		flexBasis,
		flexDirection,
		flexGrow,
		flexShrink,
		flexWrap,
		rowGap,
		columnGap,
		gap,
		height,
		justifyContent,
		left,
		minHeight,
		maxHeight,
		margin,
		marginBottom,
		marginHorizontal,
		marginLeft,
		marginRight,
		marginTop,
		marginVertical,
		padding,
		paddingBottom,
		paddingHorizontal,
		paddingLeft,
		paddingRight,
		paddingTop,
		paddingVertical,
		position,
		right,
		top,
		width,
		overflow,
		backgroundColor,
		_zIndex,
	]);

	return (
		<View
			style={[styles, customStyles, shadow && { ...coreShadow() }]}
			accessibilityRole={a11yRole}
			accessibilityLabel={a11yLabel}
			accessibilityHint={a11yHint}
		>
			{children}
		</View>
	);
}
