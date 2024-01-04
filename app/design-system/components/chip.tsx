import { Box } from "@/app/design-system/components/box";
import type { PressableProps } from "@/app/design-system/components/pressable";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import type { FontSizes } from "@/app/design-system/font-size";
import { radii } from "@/app/design-system/radii";
import { shadow } from "@/app/design-system/shadow";
import type { Height, Width } from "@/app/design-system/size";
import { heights, widths } from "@/app/design-system/size";
import type { Space } from "@/app/design-system/space";
import { space } from "@/app/design-system/space";
import { useButtonAnimation } from "@/app/hooks/useButtonAnimation";
import { StyleSheet, ViewStyle } from "react-native";
import { useStyles } from "react-native-unistyles";

type ChipMode = "light" | "dark";
interface ChipProps extends PressableProps {
  mode?: "light" | "dark";
  height?: Height | Space;
  size?: FontSizes;
  a11yLabel: string;
  label: string;
  isSelected?: boolean;
  width?: Width;
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
  onPress?: (...args: unknown[]) => void;
}

export function Chip({
  mode = "light",
  isSelected = false,
  height,
  size,
  label,
  width,
  icon,
  selectedIcon,
  onPress,
  ...rest
}: ChipProps) {
  const { theme } = useStyles();
  const { onPress: onPressHook, animatedStyle } = useButtonAnimation();

  function handleOnPress() {
    if (onPress) {
      onPress();
      onPressHook("in");
    }
  }

  const backgroundStyles: Record<ChipMode, ViewStyle> = {
    light: {
      backgroundColor: isSelected
        ? theme.colors.chipActiveBackgroundColor
        : theme.colors.chipInactiveBackgroundColor,
    },
    dark: {
      backgroundColor: isSelected
        ? theme.colors.chipDarkActiveBackgroundColor
        : theme.colors.chipDarkInactiveBackgroundColor,
    },
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: typeof height === "number" ? heights[height] : space["38px"],
      paddingHorizontal: space["15px"],
      borderRadius: radii.full,
      alignItems: "center",
      justifyContent: "center",
      ...backgroundStyles[mode],
      ...shadow(),
      width: typeof width === "number" ? widths[width] : space["0px"],
    },
    text: {
      color: isSelected
        ? theme.colors.chipActiveColor
        : theme.colors.chipInactiveColor,
    },
  });

  return (
    <Pressable style={styles.container} onPress={handleOnPress} {...rest}>
      {icon && isSelected && <Box paddingRight="5px">{selectedIcon}</Box>}
      {icon && !isSelected && <Box paddingRight="5px">{icon}</Box>}
      <Text textStyles={styles.text} weight="bold" size={size}>
        {label}
      </Text>
    </Pressable>
  );
}
