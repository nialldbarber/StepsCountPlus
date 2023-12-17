import { DonutChart } from "@/app/components/donut-chart";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useGetHealthData } from "@/app/lib/activity/useGetHealthData";
import { formatNumber } from "@/app/lib/format/numbers";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import { useStepsStore } from "@/app/store/steps";
import { useFont } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { PixelRatio } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const D = () => (
	<Box
		height="2px"
		width="full"
		backgroundColor="primary"
		paddingVertical="4px"
		marginVertical="10px"
		borderRadius="full"
	/>
);

const RADIUS = PixelRatio.roundToNearestPixel(170);
const STROKE_WIDTH = 12;

export function StatsScreen() {
	const { isLoading } = useGetHealthData(new Date());

	const { styles } = useStyles(stylesheet);
	const font = useFont(
		require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
		80,
	);
	const smallerFont = useFont(
		require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
		18,
	);

	const { dailySteps, weeklySteps, monthlySteps, yearlySteps } =
		useStepsStore();
	const { dailyFlights, weeklyFlights, monthlyFlights, yearlyFlights } =
		useFlightsStore();
	const { dailyDistance, weeklyDistance, monthlyDistance, yearlyDistance } =
		useDistanceStore();

	const calculatePercentage = useMemo(() => {
		return dailySteps / 3000;
	}, [dailySteps]);

	if (!font || !smallerFont) return <Box />;

	return (
		<>
			<Box alignItems="center">
				<Box
					marginVertical="20px"
					styles={{
						width: RADIUS * 2,
						height: RADIUS * 2,
					}}
				>
					<DonutChart
						radius={RADIUS}
						strokeWidth={STROKE_WIDTH}
						targetPercentage={calculatePercentage}
						font={font}
						smallerFont={smallerFont}
						amount={dailySteps}
						message="hello"
					/>
				</Box>
			</Box>
			<Box
				flexDirection="row"
				alignItems="center"
				justifyContent="space-around"
				paddingVertical="10px"
				paddingHorizontal="20px"
				backgroundColor="primary"
				shadow
			>
				<Text weight="bold" color="white">
					Steps
				</Text>
				<Text weight="bold" color="white">
					Flights
				</Text>
				<Text weight="bold" color="white">
					Distance
				</Text>
			</Box>
			{isLoading ? (
				<Text level="heading" size="30px">
					Loading...
				</Text>
			) : (
				<Layout>
					<Text level="heading" size="26px" weight="bold">
						What should be on this screen?
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
			)}
		</>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
	},
}));
