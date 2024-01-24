import type { HapticFeedbackType } from "@/app/lib/haptics";
import { hapticToTrigger } from "@/app/lib/haptics";
import { usePreferencesStore } from "@/app/store/perferences";
import type { A11y } from "@/app/types/a11y";
import type {
	GestureResponderEvent,
	PressableProps as NativePressableProps,
} from "react-native";
import { Pressable as NativePressable } from "react-native";

export interface PressableProps extends NativePressableProps, A11y {
	/**
	 * Function to be called when the Pressable
	 * is pressed added optionally here from
	 * `PressableProps`, to make the parameters
	 * optional if we want to just trigger
	 * a haptic and no onPress event
	 */
	onPress?: null | ((event?: GestureResponderEvent) => void) | undefined;
	/**
	 * Haptic feedback to be triggered when the Pressable is pressed
	 */
	haptic?: HapticFeedbackType;
	/**
	 * Use this when the Pressable doesn't
	 * fire a function, but still requires
	 * feedback
	 */
	forceHaptic?: boolean;
}

export function Pressable({
	onPress,
	haptic = "impactMedium",
	forceHaptic = false,
	a11yLabel,
	a11yHint,
	a11yRole = "button",
	a11yState,
	children,
	...rest
}: PressableProps) {
	const { hapticFeedback } = usePreferencesStore();
	const invokeHaptic = hapticToTrigger(haptic);

	function handleOnPress() {
		// are haptics disabled globally?
		if (hapticFeedback === false) {
			if (onPress === null || onPress === undefined) {
				return;
			}
			onPress();
			return;
		}
		// is the element button-like w/o an event?
		if (forceHaptic) {
			invokeHaptic[haptic]();
			return;
		}

		// standard button with an event
		if (onPress === null || onPress === undefined) return;
		invokeHaptic[haptic]();
		onPress();
	}

	return (
		<NativePressable
			onPress={handleOnPress}
			{...rest}
			accessible
			accessibilityLabel={a11yLabel}
			accessibilityHint={a11yHint}
			accessibilityRole={a11yRole}
			accessibilityState={a11yState}
		>
			{children}
		</NativePressable>
	);
}
