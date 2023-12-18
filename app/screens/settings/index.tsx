import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { radius } from "@/app/design-system/radius";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import { Switch } from "react-native";
// import ContextMenu from "react-native-context-menu-view";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

export function SettingsScreen() {
	const { styles, theme } = useStyles(stylesheet);
	const { goBack } = useNavigation();
	const { distance, setDistance } = useMeasurementsStore();

	return (
		<Box flex={1} backgroundColor={theme.colors.screenBackgroundColor}>
			<Box
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				backgroundColor={theme.colors.cardBackgroundColor}
				padding="20px"
			>
				<Text level="heading" size="30px">
					Settings
				</Text>
				<Pressable onPress={goBack}>
					<CloseCircle size={32} color={theme.colors.closeStroke} />
				</Pressable>
			</Box>
			<Box paddingTop="20px">
				<Box paddingHorizontal="30px" paddingTop="15px">
					<Text color="greyFour">Appearance</Text>
				</Box>
				<Box
					backgroundColor={theme.colors.cardBackgroundColor}
					padding="20px"
					marginHorizontal="20px"
					marginVertical="10px"
					borderRadius="large"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text>Color mode</Text>
					<Pressable
						style={styles.button}
						onPress={() => {
							UnistylesRuntime.setAdaptiveThemes(true);
						}}
					>
						<Text size="20px">⚙️</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => {
							UnistylesRuntime.setAdaptiveThemes(false);
							UnistylesRuntime.setTheme("light");
						}}
					>
						<Text size="20px">☀️</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => {
							UnistylesRuntime.setAdaptiveThemes(false);
							UnistylesRuntime.setTheme("dark");
						}}
					>
						<Text size="20px">🌚</Text>
					</Pressable>
				</Box>
				<Box paddingHorizontal="30px" paddingTop="15px">
					<Text color="greyFour">Distance</Text>
				</Box>
				<Box
					backgroundColor={theme.colors.cardBackgroundColor}
					padding="20px"
					marginHorizontal="20px"
					marginVertical="10px"
					borderRadius="large"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text>Units</Text>
					<Box flexDirection="row" alignItems="center">
						<Text
							size="14px"
							color={distance === "miles" ? "primary" : "pureWhite"}
						>
							miles
						</Text>
						<Box paddingHorizontal="15px">
							<Switch
								value={distance === "km"}
								onValueChange={() =>
									setDistance(distance === "km" ? "miles" : "km")
								}
							/>
						</Box>
						<Text
							size="14px"
							color={distance === "km" ? "primary" : "pureWhite"}
						>
							km
						</Text>
					</Box>
				</Box>

				<Box alignItems="center" paddingTop="38px" paddingBottom="20px">
					<Text color="greyFour" size="12px">
						Built with ❤️ by Niall Barber
					</Text>
					<Text color="greyFour" size="12px">
						StepsCountPlus+ 1.1.0 (32)
					</Text>
				</Box>
			</Box>
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	button: {
		padding: 5,
		backgroundColor: "pureWhite",
		borderRadius: radius.full,
		borderWidth: 2,
	},
}));
