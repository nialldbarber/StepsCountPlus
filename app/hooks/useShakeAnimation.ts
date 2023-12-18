import {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

const OFFSET = 3;
const TIME = 50;
const DELAY = 0;

export function useShakeAnimation() {
	const offset = useSharedValue(0);
	const useShakeAnimationStyles = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	function handleShakeAnimation() {
		offset.value = withDelay(
			DELAY,
			withSequence(
				withTiming(-OFFSET, { duration: TIME / 2 }),
				withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
				withTiming(0, { duration: TIME / 2 }),
			),
		);
	}

	return { useShakeAnimationStyles, handleShakeAnimation };
}
