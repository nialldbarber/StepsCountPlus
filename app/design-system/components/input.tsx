import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { radii } from "@/app/design-system/radii";
import { heights } from "@/app/design-system/size";
import { space } from "@/app/design-system/space";
import { CloseCircle } from "iconsax-react-native";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends TextInputProps {
	/**
	 * Custom method to remove the value
	 * of the input, usually with an X icon
	 */
	handleDeleteValue?: () => void;
}

export function Input({
	value,
	placeholder,
	keyboardType,
	onChangeText,
	handleDeleteValue,
	...rest
}: Props) {
	const [focused, setFocused] = useState(false);
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Box shadow position="relative">
			<TextInput
				style={styles.container(focused)}
				value={value}
				onChangeText={(text) => onChangeText?.(text)}
				placeholder={placeholder}
				placeholderTextColor={theme.colors.inputPlaceholderColor}
				keyboardType={keyboardType}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				returnKeyType="done"
				multiline={false}
			/>
			{value?.length > 0 ? (
				<Box position="absolute" right="12px" top="12px">
					<Pressable onPress={handleDeleteValue}>
						<CloseCircle color={theme.colors.inputIconColor} />
					</Pressable>
				</Box>
			) : null}
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: (active) => ({
		backgroundColor: active
			? theme.colors.inputActiveBackgroundColor
			: theme.colors.inputInactiveBackgroundColor,
		borderColor: active
			? theme.colors.inputActiveBorderColor
			: theme.colors.inputInactiveBorderColor,
		borderWidth: 2,
		paddingHorizontal: space["20px"],
		height: heights["56px"],
		borderRadius: radii.full,
		color: theme.colors.inputPlaceholderColor,
		fontSize: 16,
	}),
}));
