import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { radii } from "@/app/design-system/radii";
import { shadow } from "@/app/design-system/shadow";
import { heights } from "@/app/design-system/size";
import { BottomTabsIcon } from "@/app/navigation/bottom-tabs/icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function Tabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const { styles, theme } = useStyles(stylesheet);
  const { width } = useWindowDimensions();
  const MARGIN = 20;
  const TAB_BAR_WIDTH = width - 2 * MARGIN;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(TAB_WIDTH * state.index, {
          damping: 35,
          restSpeedThreshold: 10,
          stiffness: 500,
        }),
      },
    ],
  }));

  return (
    <Box
      styles={[
        styles.tabBarContainer,
        { width: TAB_BAR_WIDTH, bottom: MARGIN },
      ]}
      a11yRole="menu"
    >
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH },
          translateAnimation,
        ]}
      >
        <Box styles={styles.slidingTab} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={`tab-${route.key}`}
            a11yState={isFocused ? { selected: true } : {}}
            a11yLabel={options.tabBarAccessibilityLabel || ""}
            a11yRole="menuitem"
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
            testID={options.tabBarTestID}
          >
            <View style={styles.contentContainer}>
              <BottomTabsIcon
                route={route.name.toUpperCase()}
                isFocused={isFocused}
              />
              <Text
                textStyles={styles.text(isFocused)}
                size="10px"
                weight="bold"
              >
                {route.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </Box>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  button: {
    flex: 1,
  },
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: heights["68px"],
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.bottomTabBackgroundColor,
    borderRadius: radii.full,
    ...shadow(),
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  slidingTab: {
    width: 65,
    height: 65,
    backgroundColor: theme.colors.bottomTabsSlidingBackgroundColor,
    borderRadius: radii.full,
    ...shadow(),
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  text: (isFocused) => ({
    color: isFocused
      ? theme.colors.bottomTabsTextActiveColor
      : theme.colors.bottomTabsTextColor,
  }),
}));
