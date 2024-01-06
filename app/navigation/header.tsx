import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { shadow } from "@/app/design-system/shadow";
import type { RootStackParamsList } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Setting2 } from "iconsax-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
  header: "stats" | "challenges" | "goals" | "profile";
};

type SettingsModalScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "Settings"
>;

export function Header({ header }: Props) {
  const insets = useSafeAreaInsets();
  const { styles, theme } = useStyles(stylesheet);
  const { navigate } = useNavigation<SettingsModalScreenNavigationProp>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingBottom="24px"
        paddingHorizontal="20px"
      >
        <Text
          level="heading"
          size="34px"
          weight="bold"
          textStyles={styles.text}
        >
          {header}
        </Text>
        <Pressable
          onPress={() => navigate("Settings")}
          // a11yLabel={t("components.settings.a11yLabel")}
          // a11yHint={t("components.settings.a11yHint")}
          a11yRole="button"
          // hitSlop={hitSlopLarge}
          testID="navigationButton"
        >
          <Box borderRadius="full" padding="6px" styles={styles.background}>
            <Setting2 size="26" color={theme.colors.settingsStroke} />
          </Box>
        </Pressable>
      </Box>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.settingsStrokeBackground,
  },
  background: {
    backgroundColor: theme.colors.settingsStrokeBackground,
    ...shadow(),
  },
  stroke: {
    color: theme.colors.settingsStroke,
  },
  text: {
    textTransform: "capitalize",
  },
}));
