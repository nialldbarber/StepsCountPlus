import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { space } from "@/app/design-system/space";
import { storage } from "@/app/storage/mmkv";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import { PropsWithChildren } from "react";
import { Image, Linking, ScrollView, Switch } from "react-native";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

function Row({ children }: PropsWithChildren) {
	const { theme } = useStyles();

	return (
		<Box
			backgroundColor={theme.colors.settingsCardBackgroundColor}
			padding="20px"
			marginHorizontal="20px"
			marginVertical="10px"
			borderRadius="large"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			shadow
		>
			{children}
		</Box>
	);
}

function MultiBlockRow({ children }: PropsWithChildren) {
	const { theme } = useStyles();

	return (
		<Box
			backgroundColor={theme.colors.settingsCardBackgroundColor}
			padding="20px"
			marginHorizontal="20px"
			marginVertical="10px"
			borderRadius="large"
			shadow
		>
			{children}
		</Box>
	);
}

function invokeChangeTheme(
	theme: "light" | "dark" | "system",
	stylesRuntime: typeof UnistylesRuntime,
) {
	if (theme === "light") {
		storage.set("theme", "light");
		stylesRuntime.setAdaptiveThemes(false);
		stylesRuntime.setTheme("light");
		return;
	}
	if (theme === "dark") {
		storage.set("theme", "dark");
		stylesRuntime.setAdaptiveThemes(false);
		stylesRuntime.setTheme("dark");
		return;
	}
	storage.set("theme", "system");
	UnistylesRuntime.setAdaptiveThemes(true);
}

export function SettingsScreen() {
	const { styles, theme } = useStyles(stylesheet);
	const { goBack, navigate } = useNavigation();
	const { distance, setDistance } = useMeasurementsStore();
	const currentTheme = storage.getString("theme");

	return (
		<ScrollView>
			<Box paddingBottom="42px">
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					backgroundColor={theme.colors.settingsCardBackgroundColor}
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
						<Text color="greyFour" size="14px">
							Appearance
						</Text>
					</Box>
					<Row>
						<Text>Color mode</Text>
						<Box flexDirection="row">
							<Pressable
								style={styles.button}
								onPress={() => invokeChangeTheme("light", UnistylesRuntime)}
							>
								<Text size="20px">☀️</Text>
								<Text
									textStyles={styles.text(currentTheme === "light")}
									size="12px"
								>
									Light
								</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => invokeChangeTheme("dark", UnistylesRuntime)}
							>
								<Text size="20px">🌚</Text>
								<Text
									textStyles={styles.text(currentTheme === "dark")}
									size="12px"
								>
									Dark
								</Text>
							</Pressable>
						</Box>
					</Row>

					<Box paddingHorizontal="30px" paddingTop="15px">
						<Text color="greyFour" size="14px">
							Push notifications
						</Text>
					</Box>
					<MultiBlockRow>
						<Box
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							paddingVertical="3px"
						>
							<Text>Daily reminders</Text>
							<Box flexDirection="row" alignItems="center">
								<Box paddingHorizontal="15px">
									<Switch
										value={distance === "km"}
										onValueChange={() =>
											setDistance(distance === "km" ? "miles" : "km")
										}
									/>
								</Box>
							</Box>
						</Box>
						<Box
							height="1px"
							width="full"
							backgroundColor={theme.colors.settingsScreenSeparatorColor}
							marginVertical="15px"
						/>
						<Box
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							paddingVertical="3px"
						>
							<Text>Progress reports</Text>
							<Box flexDirection="row" alignItems="center">
								<Box paddingHorizontal="15px">
									<Switch
										value={distance === "km"}
										onValueChange={() =>
											setDistance(distance === "km" ? "miles" : "km")
										}
									/>
								</Box>
							</Box>
						</Box>
					</MultiBlockRow>

					<Box paddingHorizontal="30px" paddingTop="15px">
						<Text color="greyFour" size="14px">
							Distance
						</Text>
					</Box>
					<Row>
						<Text>Units</Text>
						<Box flexDirection="row" alignItems="center">
							<Text
								size="14px"
								textStyles={styles.distanceText(distance === "miles")}
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
								textStyles={styles.distanceText(distance === "km")}
							>
								km
							</Text>
						</Box>
					</Row>

					<Box paddingHorizontal="30px" paddingTop="15px">
						<Text color="greyFour" size="14px">
							More
						</Text>
					</Box>
					<Box
						backgroundColor={theme.colors.settingsCardBackgroundColor}
						padding="20px"
						marginHorizontal="20px"
						marginVertical="10px"
						borderRadius="large"
						shadow
					>
						<Box>
							<Pressable onPress={() => navigate("PrivacyPolicy")}>
								<Text>Privacy Policy</Text>
							</Pressable>
							<Box
								height="1px"
								width="full"
								backgroundColor={theme.colors.settingsScreenSeparatorColor}
								marginVertical="15px"
							/>
							<Pressable onPress={() => navigate("GiveFeedback")}>
								<Text>Give Feedback</Text>
							</Pressable>
							<Box
								height="1px"
								width="full"
								backgroundColor={theme.colors.settingsScreenSeparatorColor}
								marginVertical="15px"
							/>
							<Pressable onPress={() => navigate("RateApp")}>
								<Text>Rate App</Text>
							</Pressable>
						</Box>
					</Box>

					<Pressable
						onPress={() =>
							Linking.openURL("https://www.buymeacoffee.com/nialldbarber")
						}
					>
						<Box alignItems="center" paddingTop="38px" shadow>
							<Text>IF NOT SUBBED 👇</Text>
							<Image
								style={styles.image}
								source={require("../../../assets/images/bmc-button.png")}
							/>
						</Box>
					</Pressable>

					<Box alignItems="center" paddingTop="20px" paddingBottom="20px">
						<Text color="greyFour" size="12px" withEmoji>
							Built with ❤️ by Niall Barber
						</Text>
						<Box height="3px" />
						<Text color="greyFour" size="12px">
							StepsCountPlus+ 1.1.0 (32)
						</Text>
					</Box>
				</Box>
			</Box>
		</ScrollView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	button: {
		padding: 5,
		alignItems: "center",
		backgroundColor: "pureWhite",
		marginLeft: space["32px"],
	},
	text: (isSelected: boolean) => ({
		paddingTop: 5,
		color: isSelected
			? theme.colors.settingsScreenTextActive
			: theme.colors.settingsScreenTextInactive,
	}),
	distanceText: (isSelected: boolean) => ({
		color: isSelected
			? theme.colors.settingsScreenTextActive
			: theme.colors.settingsScreenTextInactive,
	}),
	image: {
		height: 42,
		width: 150,
	},
}));
