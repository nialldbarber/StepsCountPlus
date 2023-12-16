import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";
import { CloseCircle } from "iconsax-react-native";
import ContextMenu from "react-native-context-menu-view";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function SettingsScreen() {
	const { styles, theme } = useStyles(stylesheet);
	const { goBack } = useNavigation();

	return (
		<Box flex={1} backgroundColor="black">
			<Box
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				backgroundColor="destructive"
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
					backgroundColor="greySix"
					padding="20px"
					margin="20px"
					borderRadius="large"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text color="white" weight="bold">
						Color mode
					</Text>
					<ContextMenu
						title="Hello there man!"
						actions={[{ title: "Title 1" }, { title: "Title 2" }]}
						onPress={(e) => {
							console.warn(
								`Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
							);
						}}
					>
						<Box
							height="20px"
							width="20px"
							borderRadius="full"
							backgroundColor="destructive"
							zIndex="4px"
						/>
					</ContextMenu>
				</Box>
				<Text>Units preference</Text>
			</Box>
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {},
}));
