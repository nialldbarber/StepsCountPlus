import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function StatsScreen() {
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<Text
				level="heading"
				size="26px"
				weight="medium"
				textStyles={styles.text}
			>
				Race against time
			</Text>
		</Layout>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	text: {
		backgroundColor: theme.colors.bottomTabActiveTabBorder,
	},
}));
