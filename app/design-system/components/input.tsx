import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { radius } from "@/app/design-system/radius";
import { heights } from "@/app/design-system/size";
import { space } from "@/app/design-system/space";
import { CloseCircle } from "iconsax-react-native";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends TextInputProps {
	handleDeleteValue: () => void;
}

export function Input({
	value,
	placeholder,
	keyboardType,
	onChangeText,
	handleDeleteValue,
}: Props) {
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Box shadow position="relative">
			<TextInput
				style={styles.container}
				value={value}
				onChangeText={(text) => onChangeText(text)}
				placeholder={placeholder}
				placeholderTextColor={theme.colors.inputPlaceholderColor}
				keyboardType={keyboardType}
			/>
			{value?.length > 0 && (
				<Box position="absolute" right="12px" top="12px">
					<Pressable onPress={handleDeleteValue}>
						<CloseCircle color={theme.colors.inputIconColor} />
					</Pressable>
				</Box>
			)}
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		backgroundColor: theme.colors.inputBackgroundColor,
		paddingHorizontal: space["20px"],
		height: heights["46px"],
		borderRadius: radius.full,
		color: theme.colors.inputPlaceholderColor,
	},
}));
