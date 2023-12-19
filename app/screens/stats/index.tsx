import { DonutChart } from "@/app/components/donut-chart";
import { StatsTable } from "@/app/components/stats/stats-table";
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
import { timeBasedGreeting } from "@/app/lib/times/greeting";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import type { Goals } from "@/app/store/goal-types";
import { goalTypes } from "@/app/store/goal-types";
import { useGoalsStore } from "@/app/store/goals";
import { useStepsStore } from "@/app/store/steps";
import { useFont } from "@shopify/react-native-skia";
import { useMemo, useState } from "react";
import { PixelRatio } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const RADIUS = PixelRatio.roundToNearestPixel(160);
const STROKE_WIDTH = 12;

export function StatsScreen() {
	const { isLoading } = useGetHealthData(new Date());
	const [currentFilter, setCurrentFilter] = useState<Goals>("Steps");
	const { value, handleActiveValue } = useActiveValue();
	const { theme } = useStyles(stylesheet);
	const font = useFont(
		require("../../../assets/fonts/PlusJakartaSans-Bold.ttf"),
		65,
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
				  : "";

	if (!font || !smallerFont) return <Box />;

	return (
		<>
			<Box
				alignItems="center"
				backgroundColor={theme.colors.screenBackgroundColor}
			>
				<Box alignSelf="flex-start" paddingHorizontal="20px">
					<Text level="heading" size="26px">
						{timeBasedGreeting()} 👋
					</Text>
				</Box>
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
						message={`Goal ${formatNumber(determineGoal)}`}
					/>
				</Box>
			</Box>

			<Box
				alignItems="center"
				backgroundColor={theme.colors.screenBackgroundColor}
				shadow
			>
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
								mode="light"
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
					<Box alignSelf="center">
						<Text level="heading" size="20px">
							{currentFilter} Stats
						</Text>
					</Box>
					<Box paddingVertical="10px">
						{currentFilter === "Steps" && (
							<StatsTable
								filter="Steps"
								daily={formatNumber(dailySteps)}
								weekly={formatNumber(weeklySteps)}
								monthly={formatNumber(monthlySteps)}
								yearly={formatNumber(yearlySteps)}
							/>
						)}
						{currentFilter === "Flights" && (
							<StatsTable
								filter="Flights"
								daily={dailyFlights}
								weekly={weeklyFlights}
								monthly={monthlyFlights}
								yearly={yearlyFlights}
							/>
						)}
						{currentFilter === "Distance" && (
							<StatsTable
								filter="Distance"
								daily={formatNumber(convertMetersToKm(dailyDistance))}
								weekly={formatNumber(convertMetersToKm(weeklyDistance))}
								monthly={formatNumber(convertMetersToKm(monthlyDistance))}
								yearly={formatNumber(convertMetersToKm(yearlyDistance))}
							/>
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
