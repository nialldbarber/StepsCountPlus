import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useGetHealthData } from "@/app/lib/activity/useGetHealthData";
import { formatNumber } from "@/app/lib/format/numbers";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import { useStepsStore } from "@/app/store/steps";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const D = () => (
	<Box
		height="2px"
		width="full"
		backgroundColor="destructive"
		paddingVertical="5px"
		marginVertical="10px"
	/>
);

export function StatsScreen() {
	useGetHealthData(new Date());

	console.log("i am running");

	const { dailySteps, weeklySteps, monthlySteps, yearlySteps } =
		useStepsStore();
	const { dailyFlights, weeklyFlights, monthlyFlights, yearlyFlights } =
		useFlightsStore();
	const { dailyDistance, weeklyDistance, monthlyDistance, yearlyDistance } =
		useDistanceStore();
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<Text
				level="heading"
				size="26px"
				weight="medium"
				textStyles={styles.text}
			>
				What should be on this screen? poop
			</Text>
			<D />
			<Text>Daily steps: {formatNumber(dailySteps)}</Text>
			<Text>Weekly steps: {formatNumber(weeklySteps)}</Text>
			<Text>Monthly steps: {formatNumber(monthlySteps)}</Text>
			<Text>Yearly steps: {formatNumber(yearlySteps)}</Text>
			<D />
			<Text>Daily flights: {dailyFlights}</Text>
			<Text>Weekly flights: {weeklyFlights}</Text>
			<Text>Monthly flights: {monthlyFlights}</Text>
			<Text>Yearly flights: {yearlyFlights}</Text>
			<D />
			<Text>Daily Distance: {formatNumber(dailyDistance)}</Text>
			<Text>Weekly Distance: {formatNumber(weeklyDistance)}</Text>
			<Text>Monthly Distance: {formatNumber(monthlyDistance)}</Text>
			<Text>Yearly Distance: {formatNumber(yearlyDistance)}</Text>
			<D />
		</Layout>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	text: {
		backgroundColor: theme.colors.bottomTabActiveTabBorder,
	},
}));
