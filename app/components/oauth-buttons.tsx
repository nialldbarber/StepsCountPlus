import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	googleOnPress?: any;
	appleOnPress?: any;
};

export function OauthButtons({ googleOnPress, appleOnPress }: Props) {
	const { styles } = useStyles(stylesheet);

	return (
		<Box flexDirection="row" justifyContent="space-between">
			<Button variant="secondary" buttonStyles={styles.button}>
				Google
			</Button>
			<Button variant="secondary" buttonStyles={styles.button}>
				Apple
			</Button>
		</Box>
	);
}

const stylesheet = createStyleSheet(() => ({
	button: {
		minWidth: 180,
	},
}));
