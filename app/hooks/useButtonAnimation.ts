import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

export function useButtonAnimation() {
	const size = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: size.value }],
	}));

	const onPress = (direction: "in" | "out") => {
		size.value = withSpring(direction === "in" ? 0.88 : 1, {
			overshootClamping: false,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 2,
		});
	};

	return { onPress, animatedStyle };
}
