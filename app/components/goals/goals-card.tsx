import { DistanceInfo } from "@/app/components/goals/distance-info";
import { FlightsInfo } from "@/app/components/goals/flights-info";
import { StepsInfo } from "@/app/components/goals/steps-info";
import { InfoModal } from "@/app/components/info-modal";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { HStack } from "@/app/design-system/components/h-stack";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { useShakeAnimation } from "@/app/hooks/useShakeAnimation";
import {
	formatNumber,
	formatNumberWithDecimals,
} from "@/app/lib/format/numbers";
import type { Goals } from "@/app/store/goal-types";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type GoalsCardProps = {
	type: Goals;
	title: string;
	goalAmount: number;
	units?: string;
	incrementBy: string;
	decrementBy: string;
	lowerLimit: number;
	upperLimit: number;
	goalCallback: (num: number) => void;
	options: Array<{ id: string; label: string; value: number }>;
};

export function GoalsCard({
	type,
	title,
	goalAmount,
	units,
	incrementBy,
	decrementBy,
	lowerLimit,
	upperLimit,
	goalCallback,
	options,
}: GoalsCardProps) {
	const { styles, theme } = useStyles(stylesheet);
	const bottomSheetRef = useRef(null);
	const initialRender = useRef(true);
	const { handleActiveValue } = useActiveValue(-1);
	const { handleShakeAnimation, useShakeAnimationStyles } = useShakeAnimation();
	const { handlePresentModalPress } = useBottomSheet(bottomSheetRef);

	function handleMinusGoal() {
		if (goalAmount > lowerLimit) {
			goalCallback(goalAmount - Number(decrementBy));
		}

		if (goalAmount <= lowerLimit) handleShakeAnimation();
	}

	function handlePlusGoal() {
		if (goalAmount <= upperLimit) {
			goalCallback(goalAmount + Number(incrementBy));
		}

		if (goalAmount >= upperLimit) handleShakeAnimation();
	}

	const goal = useMemo(() => {
		if (goalAmount === 0) return 0;

		if (type === "Distance") {
			return `${formatNumberWithDecimals(goalAmount)}`;
		}

		return `${formatNumber(goalAmount)}`;
	}, [goalAmount]);

	const goalValueTransform = useSharedValue(1);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}

		goalValueTransform.value = withTiming(
			0,
			{
				duration: 150,
			},
			() => {
				goalValueTransform.value = withTiming(1, {
					duration: 150,
				});
			},
		);
	}, [goal]);

	const animatedGoalValue = useAnimatedStyle(() => ({
		transform: [{ scale: goalValueTransform.value }],
	}));

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={["60%", "70%"]}
				backdropComponent={BottomSheetBackdrop}
				backgroundStyle={{
					backgroundColor: theme.colors.modalBackgroundColor,
				}}
			>
				<VStack margin="20px">
					<ScrollView showsVerticalScrollIndicator={false}>
						{type === "Steps" ? (
							<StepsInfo />
						) : type === "Flights" ? (
							<FlightsInfo />
						) : type === "Distance" ? (
							<DistanceInfo />
						) : null}
					</ScrollView>
				</VStack>
			</BottomSheetModal>
			<Box
				position="relative"
				backgroundColor={theme.colors.cardBackgroundColor}
				borderRadius="large"
				marginVertical="5px"
				paddingHorizontal="20px"
				paddingVertical="30px"
				shadow
			>
				<Box position="absolute" right="19px" top="19px">
					<InfoModal handlePresentModalPress={handlePresentModalPress} />
				</Box>
				<VStack gutter="5px">
					<Box alignItems="center" paddingBottom="20px">
						<Text level="heading" size="26px" weight="bold" withEmoji>
							{title}
						</Text>
					</Box>
					<Box
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Chip
							label={`-${decrementBy}`}
							onPress={handleMinusGoal}
							a11yLabel="test"
							variant="dark"
						/>
						<Animated.View
							style={[useShakeAnimationStyles, styles.textContainer]}
						>
							<Animated.Text style={[animatedGoalValue, styles.text]}>
								{goal}
							</Animated.Text>
							<Text size="12px" color="greyFour">
								{units}
							</Text>
						</Animated.View>
						<Chip
							label={`+${incrementBy}`}
							onPress={handlePlusGoal}
							a11yLabel="test"
							variant="dark"
						/>
					</Box>
					<Box alignItems="center" paddingTop="20px" paddingBottom="5px">
						<Text level="text" size="14px">
							Suggested goals:
						</Text>
					</Box>
					<Box marginVertical="5px">
						<HStack gutter="2px" justifyContent="space-between">
							{options.map(({ id, label, value: chipValue }, index) => {
								return (
									<Chip
										key={id}
										label={label}
										onPress={() => {
											handleActiveValue(index);
											goalCallback(chipValue);
										}}
										// a11yLabel={t("components.goals.chip.setAmounts.a11yLabel")}
										// a11yHint={t("components.goals.chip.setAmounts.a11yHint", {
										//   goalType: title.toLowerCase(),
										//   amount: chipValue,
										// })}
										hitSlop={hitSlopLarge}
										isSelected={chipValue === goalAmount}
										a11yState={{ selected: chipValue === goalAmount }}
										size="14px"
										variant="dark"
									/>
								);
							})}
						</HStack>
					</Box>
				</VStack>
			</Box>
		</>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	textContainer: {
		alignItems: "center",
	},
	text: {
		color: theme.colors.textColor,
		fontSize: 30,
		fontWeight: "bold",
	},
}));
