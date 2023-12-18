import { DonutChart } from "@/app/components/donut-chart";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { Layout } from "@/app/design-system/components/layout";
import { Row } from "@/app/design-system/components/row";
import { Text } from "@/app/design-system/components/text";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { useGetHealthData } from "@/app/lib/activity/useGetHealthData";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import { formatNumber } from "@/app/lib/format/numbers";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import type { Goals } from "@/app/store/goal-types";
import { goalTypes } from "@/app/store/goal-types";
import { useGoalsStore } from "@/app/store/goals";
import { useStepsStore } from "@/app/store/steps";
// import * as Sentry from "@sentry/react-native";
import { useFont } from "@shopify/react-native-skia";
import { useMemo, useState } from "react";
import { PixelRatio } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const RADIUS = PixelRatio.roundToNearestPixel(170);
const STROKE_WIDTH = 12;

export function StatsScreen() {
	const { isLoading } = useGetHealthData(new Date());
	const [currentFilter, setCurrentFilter] = useState<Goals>("Steps");
	const { value, handleActiveValue } = useActiveValue();
	const { theme } = useStyles(stylesheet);
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
	const { stepsGoal, flightsGoal, distanceGoal } = useGoalsStore();

	const calculatePercentage = useMemo(() => {
		if (currentFilter === "Steps") {
			return dailySteps / stepsGoal;
		}
		if (currentFilter === "Flights") {
			return dailyFlights / flightsGoal;
		}
		return dailyDistance / distanceGoal;
	}, [
		currentFilter,
		dailySteps,
		dailyFlights,
		dailyDistance,
		stepsGoal,
		flightsGoal,
		distanceGoal,
	]);

	const determineAmount = useMemo(() => {
		if (currentFilter === "Steps") {
			return formatNumber(dailySteps);
		}
		if (currentFilter === "Flights") {
			return dailyFlights;
		}
		return formatNumber(convertMetersToKm(dailyDistance));
	}, [currentFilter, dailySteps, dailyFlights, dailyDistance]);

	const determineGoal =
		currentFilter === "Steps"
			? stepsGoal
			: currentFilter === "Flights"
			  ? flightsGoal
			  : currentFilter === "Distance"
				  ? distanceGoal
				  : null;

	if (!font || !smallerFont) return <Box />;

	// 1. donut chart needs to be dynamic
	// 2. set up state where one option is showing
	// 3.

	return (
		<>
			<Box alignItems="center">
				<Box
					marginVertical="30px"
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
						amount={determineAmount}
						message={`Goal ${determineGoal}`}
					/>
				</Box>
			</Box>

			<Box alignItems="center" backgroundColor="pureWhite" shadow>
				<Row
					marginHorizontal="15px"
					marginTop="12px"
					marginBottom="10px"
					gutter="10px"
					a11yRole="tablist"
					scroll
				>
					{goalTypes.map(({ id, label, view, icon }, index) => {
						return (
							<Chip
								key={id}
								label={label}
								icon={icon}
								onPress={() => {
									handleActiveValue(index);
									setCurrentFilter(view);
								}}
								a11yLabel="test"
								a11yRole="menu"
								hitSlop={hitSlopLarge}
								isSelected={index === value}
								size="16px"
								height="36px"
								mode="dark"
							/>
						);
					})}
				</Row>
			</Box>

			{isLoading ? (
				<Text level="heading" size="30px">
					Loading...
				</Text>
			) : (
				<Layout
					backgroundColor={theme.colors.statsBottomSectionBackgroundColor}
				>
					<Box>
						{currentFilter === "Steps" && (
							<>
								<Text>Daily steps: {formatNumber(dailySteps)}</Text>
								<Text>Weekly steps: {formatNumber(weeklySteps)}</Text>
								<Text>Monthly steps: {formatNumber(monthlySteps)}</Text>
								<Text>Yearly steps: {formatNumber(yearlySteps)}</Text>
							</>
						)}

						{currentFilter === "Flights" && (
							<>
								<Text>Daily flights: {dailyFlights}</Text>
								<Text>Weekly flights: {weeklyFlights}</Text>
								<Text>Monthly flights: {monthlyFlights}</Text>
								<Text>Yearly flights: {yearlyFlights}</Text>
							</>
						)}

						{/* <Button
							title="Try!"
							onPress={() => {
								Sentry.captureException(new Error("First error"));
							}}
						/> */}

						{currentFilter === "Distance" && (
							<>
								<Text>
									Daily Distance:{" "}
									{formatNumber(convertMetersToKm(dailyDistance))}
								</Text>
								<Text>
									Weekly Distance:{" "}
									{formatNumber(convertMetersToKm(weeklyDistance))}
								</Text>
								<Text>
									Monthly Distance:{" "}
									{formatNumber(convertMetersToKm(monthlyDistance))}
								</Text>
								<Text>
									Yearly Distance:{" "}
									{formatNumber(convertMetersToKm(yearlyDistance))}
								</Text>
							</>
						)}
					</Box>
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
