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
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ChipMode = "light" | "dark";

interface ChipProps extends PressableProps {
  variant?: ChipMode;
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
  variant = "light",
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
  const { styles } = useStyles(stylesheet, { variant });
  const { onPress: onPressHook } = useButtonAnimation();

  function handleOnPress() {
    if (onPress) {
      onPress();
      onPressHook("in");
    }
  }

  return (
    <Pressable
      style={styles.container(height, width, isSelected)}
      onPress={handleOnPress}
      {...rest}
    >
      {icon && isSelected && <Box paddingRight="5px">{selectedIcon}</Box>}
      {icon && !isSelected && <Box paddingRight="5px">{icon}</Box>}
      <Text textStyles={styles.text(isSelected)} weight="bold" size={size}>
        {label}
      </Text>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: (
    height?: Height | Space,
    width?: Width,
    isSelected?: boolean
  ) => ({
    flexDirection: "row",
    height: typeof height === "number" ? heights[height] : space["38px"],
    // @ts-expect-error
    width: widths[width],
    paddingHorizontal: space["15px"],
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    variants: {
      variant: {
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
      },
    },
    ...shadow(),
  }),
  text: (isSelected) => ({
    color: isSelected
      ? theme.colors.chipActiveColor
      : theme.colors.chipInactiveColor,
  }),
}));
