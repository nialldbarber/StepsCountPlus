import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function SignInScreen() {
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<Box justifyContent="space-between" alignItems="center" height="full">
				<Text level="heading" size="44px">
					StepsCount++
				</Text>
				<VStack gutter="12px" width="full">
					<Text size="18px" textStyles={styles.text}>
						Already a user?
					</Text>
					<Button>Log in</Button>
					<Box flexDirection="row" justifyContent="space-between">
						<Button variant="secondary" buttonStyles={styles.button}>
							Google
						</Button>
						<Button variant="secondary" buttonStyles={styles.button}>
							Apple
						</Button>
					</Box>
					<Box flexDirection="row" alignItems="center" justifyContent="center">
						<Box width="1/3" height="1px" backgroundColor="white" />
						<Box marginHorizontal="10px">
							<Text size="18px">or</Text>
						</Box>
						<Box width="1/3" height="1px" backgroundColor="white" />
					</Box>
					<Button variant="tertiary">Create an account</Button>
				</VStack>
			</Box>
		</Layout>
	);
}

const stylesheet = createStyleSheet(() => ({
	button: {
		minWidth: 180,
	},
	text: {
		alignSelf: "center",
	},
}));
