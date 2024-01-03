import type { A11y } from "@/app/lib/misc-types";
import type { PressableProps as NativePressableProps } from "react-native";
import { Pressable as NativePressable } from "react-native";
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";

export interface PressableProps extends NativePressableProps, A11y {
  onPress?: (...args: unknown[]) => unknown;
  haptics?: {
    type: "action" | "notification";
    level?: "Success" | "Warning" | "Error" | "Light" | "Medium" | "Heavy";
  };
  forceHaptic?: boolean;
}

export function Pressable({
  onPress,
  haptics = { type: "action" },
  forceHaptic = false,
  a11yLabel,
  a11yHint,
  a11yRole = "button",
  a11yState,
  children,
  ...rest
}: PressableProps) {
  const handleOnPress = () => {
    if (forceHaptic) {
      RNReactNativeHapticFeedback.trigger("impactMedium");
      return;
    }

    if (onPress === null || onPress === undefined) return;
    RNReactNativeHapticFeedback.trigger("impactMedium");
    onPress();
  };

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
