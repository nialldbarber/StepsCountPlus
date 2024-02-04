import { OauthButtons } from "@/app/components/oauth-buttons";
import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

export function CreateAccountScreen() {
	const { theme } = useStyles();
	const { goBack } = useNavigation();

	return (
		<Layout>
			<Box justifyContent="space-between" alignItems="center" height="full">
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					width="full"
				>
					<Box>
						<Pressable
							onPress={goBack}
							accessible
							accessibilityLabel="Press to go back to the sign up screen"
						>
							<ArrowLeft2 size={28} color={theme.colors.goBackStroke} />
						</Pressable>
					</Box>
					<Text level="heading" size="30px">
						Create an account
					</Text>
				</Box>
				<OauthButtons />
			</Box>
		</Layout>
	);
}
