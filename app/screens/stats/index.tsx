import { DonutChart } from "@/app/components/donut-chart";
import { InfoModal } from "@/app/components/info-modal";
import { StatsTable } from "@/app/components/stats/stats-table";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Pressable } from "@/app/core/pressable";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { HStack } from "@/app/design-system/components/h-stack";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { useGetHealthData } from "@/app/lib/activity/useGetHealthData";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import { formatNumber } from "@/app/lib/format/numbers";
import { timeBasedGreeting } from "@/app/lib/times/greeting";
import { Fallback } from "@/app/screens/stats/fallback";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import type { Goals } from "@/app/store/goal-types";
import { goalTypes } from "@/app/store/goal-types";
import { useGoalsStore } from "@/app/store/goals";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useStepsStore } from "@/app/store/steps";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { PerformanceMeasureView } from "@shopify/react-native-performance";
import { useFont } from "@shopify/react-native-skia";
import { useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PixelRatio, ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const RADIUS = PixelRatio.roundToNearestPixel(160);
const STROKE_WIDTH = 12;
const pathToFonts = "../../../assets/fonts";

export function StatsScreen() {
	useGetHealthData(new Date());
	const [currentFilter, setCurrentFilter] = useState<Goals>("Steps");
	const bottomSheetRef = useRef(null);
	const { navigate } = useNavigation();
	const { distance } = useMeasurementsStore();
	const { value, handleActiveValue } = useActiveValue();
	const { handlePresentModalPress, handleCloseModal } =
		useBottomSheet(bottomSheetRef);
	const { styles, theme } = useStyles(stylesheet);
	const font = useFont(require(`${pathToFonts}/PlusJakartaSans-Bold.ttf`), 65);
	const smallerFont = useFont(
		require(`${pathToFonts}/PlusJakartaSans-Bold.ttf`),
		15,
	);

	const { dailySteps, weeklySteps, monthlySteps, yearlySteps } =
		useStepsStore();
	const { dailyFlights, weeklyFlights, monthlyFlights, yearlyFlights } =
		useFlightsStore();
	const { dailyDistance, weeklyDistance, monthlyDistance, yearlyDistance } =
		useDistanceStore();
	const { stepsGoal, flightsGoal, distanceGoal } = useGoalsStore();

	const calculatePercentage = useMemo(() => {
		if (currentFilter === "Steps" && stepsGoal !== 0) {
			return dailySteps / stepsGoal;
		}
		if (currentFilter === "Flights" && flightsGoal !== 0) {
			return dailyFlights / flightsGoal;
		}
		if (currentFilter === "Distance" && distanceGoal !== 0) {
			return convertMetersToKm(dailyDistance) / distanceGoal;
		}
		return 0; // @TODO make this more robust in case of edge cases
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
		return formatNumber(convertMetersToKm(dailyDistance), true);
	}, [currentFilter, dailySteps, dailyFlights, dailyDistance]);

	const determineRemainingAmount = useMemo(() => {
		if (currentFilter === "Steps") {
			return dailySteps >= stepsGoal
				? "Target achieved!"
				: `${formatNumber(stepsGoal - dailySteps)} steps remaining`;
		}
		if (currentFilter === "Flights") {
			return dailyFlights >= flightsGoal
				? "Target achieved!"
				: `${formatNumber(flightsGoal - dailyFlights)} flights remaining`;
		}
		if (currentFilter === "Distance") {
			const dailyDistanceKm = convertMetersToKm(dailyDistance);
			const remainingDistanceKm = distanceGoal - dailyDistanceKm;
			return dailyDistanceKm >= distanceGoal
				? "Target achieved!"
				: `${formatNumber(remainingDistanceKm, true)} ${distance} remaining`;
		}
	}, [
		currentFilter,
		dailySteps,
		stepsGoal,
		dailyFlights,
		flightsGoal,
		dailyDistance,
		distanceGoal,
		distance,
	]);

	const determineGoal = useMemo(() => {
		if (currentFilter === "Steps") {
			return `Goal: ${formatNumber(stepsGoal)} steps`;
		}
		if (currentFilter === "Flights") {
			return `Goal: ${formatNumber(flightsGoal)} flights`;
		}
		if (currentFilter === "Distance") {
			return `Goal: ${formatNumber(distanceGoal, true)} ${distance}`;
		}

		return "";
	}, [currentFilter, stepsGoal, flightsGoal, distanceGoal, distance]);

	if (!font || !smallerFont) return <Box />;

	function logError(error: Error, info: { componentStack: string }) {
		console.log(error, info);
	}

	return (
		<PerformanceMeasureView screenName="Stats">
			<ErrorBoundary fallback={<Fallback />} onError={logError}>
				<Layout
					backgroundColor={theme.colors.statsBottomSectionBackgroundColor}
				>
					<Box alignItems="center">
						<Box alignSelf="flex-start">
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
								message={determineGoal}
								remainingText={determineRemainingAmount}
							/>
						</Box>
					</Box>

					<Bleed left="-42px" right="-42px" style={styles.bleedContainer}>
						<HStack
							marginHorizontal="15px"
							marginTop="12px"
							marginBottom="10px"
							gutter="10px"
							a11yRole="tablist"
						>
							{goalTypes.map(
								({ id, label, view, icon, selectedIcon }, index) => {
									return (
										<Chip
											key={id}
											label={label}
											icon={icon}
											selectedIcon={selectedIcon}
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
											variant="dark"
										/>
									);
								},
							)}
						</HStack>
					</Bleed>

					<Box
						flexDirection="row"
						paddingHorizontal="10px"
						alignItems="center"
						paddingTop="24px"
						justifyContent="space-between"
						position="relative"
					>
						<Text level="heading" size="20px" color="primary">
							{currentFilter} Stats
						</Text>
						<Box paddingLeft="10px">
							<InfoModal handlePresentModalPress={handlePresentModalPress} />
						</Box>
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
								daily={formatNumber(convertMetersToKm(dailyDistance), true)}
								weekly={formatNumber(convertMetersToKm(weeklyDistance), true)}
								monthly={formatNumber(convertMetersToKm(monthlyDistance), true)}
								yearly={formatNumber(convertMetersToKm(yearlyDistance), true)}
							/>
						)}
					</Box>
				</Layout>
				<BottomSheetModal
					ref={bottomSheetRef}
					index={1}
					snapPoints={["35%", "35%"]}
					backdropComponent={BottomSheetBackdrop}
					backgroundStyle={{
						backgroundColor: theme.colors.modalBackgroundColor,
					}}
				>
					<VStack margin="20px">
						<ScrollView showsVerticalScrollIndicator={false}>
							<Box paddingBottom="38px">
								<Text weight="medium" size="14px" withEmoji>
									The official Apple Health app (amongst others) already present
									these data points beautifully and in far greater detail 🙏
								</Text>
								<Box height="20px" />
								<Text weight="medium" size="14px" withEmoji>
									This app is about taking on challenges! We have a currated
									list of various categories that you can choose from. Accept
									them and push yourself to hit your goals 💪
								</Text>
								<Box height="20px" />
								<Box flexDirection="row" alignItems="center">
									<Text weight="medium" size="14px" withEmoji>
										Take on your first challenge
									</Text>
									<Pressable
										onPress={() => {
											navigate("Challenges");
											handleCloseModal();
										}}
									>
										<Text color="primary" weight="bold" size="14px" withEmoji>
											{" "}
											here! 🎉
										</Text>
									</Pressable>
								</Box>
								<Box height="20px" />
								<Box flexDirection="row" alignItems="center">
									<Text weight="medium" size="14px" withEmoji>
										Want to change your goals? Change them{" "}
									</Text>
									<Pressable
										onPress={() => {
											navigate("Goals");
											handleCloseModal();
										}}
									>
										<Text color="primary" weight="medium" size="14px" withEmoji>
											here!
										</Text>
									</Pressable>
								</Box>
							</Box>
						</ScrollView>
					</VStack>
				</BottomSheetModal>
			</ErrorBoundary>
		</PerformanceMeasureView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	bleedContainer: {
		alignItems: "center",
	},
}));
