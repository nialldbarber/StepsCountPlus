import { Box } from "@/app/design-system/components/box";
import { Loader } from "@/app/design-system/components/loader";
import type { PressableProps } from "@/app/design-system/components/pressable";
import { Pressable } from "@/app/design-system/components/pressable";
import type { BaseTextProps } from "@/app/design-system/components/text";
import { Text } from "@/app/design-system/components/text";
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

export type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "destructive";

export type Shape = "small" | "medium" | "large";

interface ButtonProps extends PressableProps, BaseTextProps {
  /**
   * The variant/state of the button
   */
  variant?: Variant;
  /**
   * The shape of the button
   */
  shape?: Shape;
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the button is pending/in
   * a loading state
   */
  isPending?: boolean;
  /**
   * Should ideally use text, but you get
   * nesting with `children` over a `text` prop
   */
  children: string;
}

function disableOnPending(props: ButtonProps) {
  if (props.isPending) {
    props.onPress = undefined;
    props.onLongPress = undefined;
    props.onPressIn = undefined;
    props.onPressOut = undefined;
  }
  return props;
}

export function Button(props: ButtonProps) {
  const updatedProps = disableOnPending(props);
  const {
    variant = "primary",
    shape = "medium",
    isDisabled = false,
    isPending = false,
    children,
    weight,
    size,
    color,
    ...rest
  } = updatedProps;

  const { styles } = useStyles(stylesheet, { variant, shape });
  const { onPress, animatedStyle } = useButtonAnimation();
  const accessibilityLabel = `${children} button`;

  // Animations
  const loader = useSharedValue(0);
  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loader.value,
  }));

  useEffect(() => {
    if (isPending) {
      loader.value = withTiming(1, { duration: 500 });
    } else {
      loader.value = withTiming(0, { duration: 100 });
    }
  }, [isPending, loader]);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        {...rest}
        style={styles.button}
        onPressIn={() => onPress("in")}
        onPressOut={() => onPress("out")}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: isPending }}
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
        // @TODO - add tertiary, link, destructive
        tertiary: {},
        link: {},
        destructive: {},
      },
      shape: {
        small: {
          height: space["38px"],
          paddingHorizontal: space["15px"],
        },
        medium: {
          height: space["60px"],
          paddingHorizontal: space["20px"],
        },
        large: {
          height: space["60px"],
          paddingHorizontal: space["20px"],
        },
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
        // @TODO - add tertiary, link, destructive
        tertiary: {},
        link: {},
        destructive: {},
      },
    },
  },
}));
