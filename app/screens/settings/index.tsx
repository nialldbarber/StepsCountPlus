import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { radius } from "@/app/design-system/radius";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import { Linking, Switch } from "react-native";
// import ContextMenu from "react-native-context-menu-view";
import { createStyleSheet, useStyles } from "react-native-unistyles";

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
				backgroundColor="greyTwo"
				padding="20px"
			>
				<Text level="heading" size="30px" weight="bold">
					Settings
				</Text>
				<Pressable onPress={goBack}>
					<CloseCircle size={32} color={theme.colors.closeStroke} />
				</Pressable>
			</Box>
			<Box>
				<Box paddingHorizontal="30px" paddingTop="15px">
					<Text color="greyFour" weight="bold">
						Appearance
					</Text>
				</Box>
				<Box
					backgroundColor="greyTwo"
					padding="20px"
					margin="20px"
					borderRadius="large"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text weight="bold">Color mode</Text>
					<Pressable
						style={styles.button}
						onPress={() => Linking.openSettings()}
					>
						<Text size="12px" weight="bold">
							Click here
						</Text>
					</Pressable>
				</Box>
				<Box
					backgroundColor="greyTwo"
					padding="20px"
					margin="20px"
					borderRadius="large"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text weight="bold">Distance unit: ({distance})</Text>
					<Switch
						value={distance === "km"}
						onValueChange={() =>
							setDistance(distance === "km" ? "miles" : "km")
						}
					/>
				</Box>
				<Text>Units preference</Text>
			</Box>
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	button: {
		borderWidth: 1,
		borderColor: theme.colors.buttonPrimaryBackgroundColor,
		borderStyle: "dashed",
		padding: 10,
		borderRadius: radius.large,
	},
}));
