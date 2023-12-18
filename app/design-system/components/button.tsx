import { Box } from "@/app/design-system/components/box";
import { Loader } from "@/app/design-system/components/loader";
import type { PressableProps } from "@/app/design-system/components/pressable";
import { Pressable } from "@/app/design-system/components/pressable";
import { BaseTextProps, Text } from "@/app/design-system/components/text";
import { shadow } from "@/app/design-system/shadow";
import { space } from "@/app/design-system/space";
import { useButtonAnimation } from "@/app/hooks/useButtonAnimation";
import { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
// import { appTheme } from "@/design-system/theme/design-tokens";
// import { useButtonAnimation } from "@/hooks/useButtonAnimation";
// import { useThemeStore } from "@/stores/theme";

export type Variant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "link"
	| "destructive";

interface ButtonProps extends PressableProps, BaseTextProps {
	variant?: Variant;
	isLoading?: boolean;
	isDisabled?: boolean;
	children: string;
}

export function Button({
	variant = "primary",
	isLoading = false,
	isDisabled = false,
	// isActive = false,
	children,
	weight,
	size,
	color,
	...rest
}: ButtonProps) {
	const { styles } = useStyles(stylesheet, { variant });
	const { onPress, animatedStyle } = useButtonAnimation();
	const accessibilityLabel = `${children} button`;

	const loader = useSharedValue(0);
	const loaderStyle = useAnimatedStyle(() => ({
		opacity: loader.value,
	}));

	useEffect(() => {
		if (isLoading) {
			loader.value = withTiming(1, { duration: 500 });
		} else {
			loader.value = withTiming(0, { duration: 100 });
		}
	}, [isLoading, loader]);

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				{...rest}
				style={styles.button}
				onPressIn={() => onPress("in")}
				onPressOut={() => onPress("out")}
				accessibilityRole="button"
				accessibilityLabel={accessibilityLabel}
				accessibilityState={{ disabled: isDisabled, busy: isLoading }}
			>
				<Box flexDirection="row">
					<Text size={size} weight={weight} color={color} style={styles.text}>
						{children}
					</Text>
				</Box>
			</Pressable>
			<Box position="absolute" right="20px" top="15px">
				<Animated.View style={loaderStyle}>
					<Loader variant={variant} />
				</Animated.View>
			</Box>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	button: {
		position: "relative",
		alignItems: "center",
		height: space["60px"],
		paddingHorizontal: space["20px"],
		justifyContent: "center",
		borderRadius: theme.dimensions.buttonBorderRadius,
		...shadow(),
		variants: {
			variant: {
				primary: {
					backgroundColor: theme.colors.buttonPrimaryBackgroundColor,
				},
				secondary: {
					backgroundColor: theme.colors.buttonSecondaryBackgroundColor,
					borderColor: theme.colors.buttonSecondaryBackgroundColor,
					borderWidth: 2,
				},
				tertiary: {},
				link: {},
				destructive: {},
			},
		},
	},
	text: {
		variants: {
			variant: {
				primary: {
					color: theme.colors.buttonPrimaryTextColor,
				},
				secondary: {
					color: theme.colors.buttonSecondaryTextColor,
				},
				tertiary: {},
				link: {},
				destructive: {},
			},
		},
	},
}));
