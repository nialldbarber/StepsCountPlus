import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useGetHealthData } from "@/app/lib/activity/useGetHealthData";
import { useStepsStore } from "@/app/store/steps";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function StatsScreen() {
	useGetHealthData(new Date());

	const { dailySteps } = useStepsStore();
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<Text
				level="heading"
				size="26px"
				weight="medium"
				textStyles={styles.text}
			>
				What should be on this screen?
			</Text>
			<Text>Daily steps: {dailySteps}</Text>
			<Text>Daily flights</Text>
			<Text>Daily Distance</Text>
		</Layout>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	text: {
		backgroundColor: theme.colors.bottomTabActiveTabBorder,
	},
}));
