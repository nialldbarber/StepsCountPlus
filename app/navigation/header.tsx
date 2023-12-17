import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { shadow } from "@/app/design-system/shadow";
import type { RootStackParamsList } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Setting2 } from "iconsax-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	header: "stats" | "challenges" | "goals";
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
		<Box
			styles={{ paddingTop: insets.top }}
			backgroundColor={theme.colors.screenBackgroundColor}
		>
			<Box
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				paddingBottom="24px"
				paddingHorizontal="20px"
			>
				<Text level="heading" size="34px" weight="bold" style={styles.text}>
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
						<Setting2 size="32" color={theme.colors.settingsStroke} />
					</Box>
				</Pressable>
			</Box>
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
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
