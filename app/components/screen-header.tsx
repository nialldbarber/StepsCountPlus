import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { capitaliseFirstLetter, removeDashes } from "@/app/lib/format/alpha";
import type { A11y } from "@/app/types/a11y";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

interface Props extends A11y {
	back?: boolean;
	title: string;
}

export function ScreenHeader({ back = true, title, ...rest }: Props) {
	const { theme } = useStyles();
	const { goBack } = useNavigation();

	return (
		<>
			{back && (
				<Box {...rest}>
					<Pressable
						onPress={goBack}
						accessible
						accessibilityLabel="Press to go back to home screen"
					>
						<ArrowLeft2 size={28} color={theme.colors.goBackStroke} />
					</Pressable>
				</Box>
			)}
			<Box paddingLeft="10px" alignSelf="center">
				<Text level="heading" size="23px" weight="bold">
					{removeDashes(capitaliseFirstLetter(title))}
				</Text>
			</Box>
		</>
	);
}
