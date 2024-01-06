import type { PressableProps } from "@/app/core/pressable";
import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import type { FontSizes } from "@/app/design-system/font-size";
import { radii } from "@/app/design-system/radii";
import { shadow } from "@/app/design-system/shadow";
import type { Height, Width } from "@/app/design-system/size";
import { heights, widths } from "@/app/design-system/size";
import type { Space } from "@/app/design-system/space";
import { space } from "@/app/design-system/space";
import { useButtonAnimation } from "@/app/hooks/useButtonAnimation";
import type { A11y } from "@/app/types/a11y";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Variant = "light" | "dark";

interface ChipProps extends PressableProps, Partial<A11y> {
  /**
   * The variant/state of the chip
   */
  variant?: Variant;
  /**
   * Explicit height of the chip, based
   * off of the defined height scale
   */
  height?: Height | Space;
  /**
   * Explicit width of the chip, based
   * off of the defined width scale
   */
  width?: Width;
  /**
   * The explicit font size of the text
   */
  size?: FontSizes;
  /**
   * The text representation of the chip
   */
  label: string;
  /**
   * Whether the chip is selected or not
   */
  isSelected?: boolean;
  /**
   * The icon to display when the chip is
   * _not_ selected
   */
  icon?: React.ReactNode;
  /**
   * The icon to display when the chip is
   * selected
   */
  selectedIcon?: React.ReactNode;
  /**
   * Callback function when the chip is
   * pressed
   */
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
      a11yHint="Tap to select"
      a11yLabel={label}
      a11yState={{ selected: isSelected }}
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
