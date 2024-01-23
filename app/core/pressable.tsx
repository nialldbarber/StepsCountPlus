import type { HapticFeedbackType } from "@/app/lib/haptics";
import { hapticToTrigger } from "@/app/lib/haptics";
import { usePreferencesStore } from "@/app/store/perferences";
import type { A11y } from "@/app/types/a11y";
import type { PressableProps as NativePressableProps } from "react-native";
import { Pressable as NativePressable } from "react-native";

export interface PressableProps extends NativePressableProps, A11y {
	/**
	 * Function to be called when the Pressable is pressed
	 */
	onPress?: (...args: unknown[]) => unknown;
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
		if (hapticFeedback === false) {
			if (onPress === null || onPress === undefined) {
				return;
			}
			onPress();
			return;
		}

		if (forceHaptic) {
			invokeHaptic[haptic]();
			return;
		}

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
