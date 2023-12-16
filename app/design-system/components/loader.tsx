import { Box } from "@/app/design-system/components/box";
import type { Variant } from "@/app/design-system/components/button";
import { radius } from "@/app/design-system/radius";
import { useEffectOnce } from "@/app/hooks/useEffectOnce";
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type LoaderProps = {
	variant?: Variant;
};

export function Loader({ variant = "primary" }: LoaderProps) {
	const { styles } = useStyles(stylesheet, { variant });
	const rotation = useSharedValue(0);
	const rotationStyles = useAnimatedStyle(() => ({
		transform: [
			{
				rotateZ: `${rotation.value}deg`,
			},
		],
	}));

	useEffectOnce(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 650,
			}),
			-1,
		);
		return () => cancelAnimation(rotation);
	});

	return (
		<Box flex={1} justifyContent="center" alignItems="center">
			<Animated.View style={[styles.spinner, rotationStyles]} />
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	spinner: {
		height: 30,
		width: 30,
		borderRadius: radius.full,
		borderWidth: 5,
		variants: {
			variant: {
				primary: {
					borderTopColor: "#f5f5f5",
					borderRightColor: "#f5f5f5",
					borderBottomColor: "#f5f5f5",
					borderLeftColor: "green",
				},
				secondary: {
					borderTopColor: "#f5f5f5",
					borderRightColor: "#f5f5f5",
					borderBottomColor: "#f5f5f5",
					borderLeftColor: "green",
				},
				tertiary: {
					borderTopColor: "#f5f5f5",
					borderRightColor: "#f5f5f5",
					borderBottomColor: "#f5f5f5",
					borderLeftColor: "green",
				},
				link: {
					borderTopColor: "#f5f5f5",
					borderRightColor: "#f5f5f5",
					borderBottomColor: "#f5f5f5",
					borderLeftColor: "green",
				},
				destructive: {
					borderTopColor: "#f5f5f5",
					borderRightColor: "#f5f5f5",
					borderBottomColor: "#f5f5f5",
					borderLeftColor: "green",
				},
			},
		},
	},
}));
