import { DistanceInfo } from "@/app/components/goals/distance-info";
import { FlightsInfo } from "@/app/components/goals/flights-info";
import { StepsInfo } from "@/app/components/goals/steps-info";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { Pressable } from "@/app/design-system/components/pressable";
import { Row } from "@/app/design-system/components/row";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { useShakeAnimation } from "@/app/hooks/useShakeAnimation";
import { formatNumber } from "@/app/lib/format/numbers";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { InfoCircle } from "iconsax-react-native";
import { useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

type GoalsCardProps = {
	title: string;
	goalAmount: number;
	units?: string;
	incrementBy: string;
	decrementBy: string;
	lowerLimit: number;
	upperLimit: number;
	goalCallback: any;
	options: Array<{ id: string; label: string; value: number }>;
};

export function GoalsCard({
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
	const { theme } = useStyles();
	const bottomSheetRef = useRef(null);
	// const timerRef = useRef(null);
	const { handleActiveValue } = useActiveValue(-1);
	const { handleShakeAnimation, useShakeAnimationStyles } = useShakeAnimation();
	const { snapPoints, handlePresentModalPress } =
		useBottomSheet(bottomSheetRef);

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
		return `${formatNumber(goalAmount)} `;
	}, [goalAmount]);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={["60%", "70%"]}
				backdropComponent={BottomSheetBackdrop}
				backgroundStyle={{
					backgroundColor: theme.colors.screenBackgroundColor,
				}}
			>
				<Stack margin="20px">
					<ScrollView>
						{title === "Steps" ? (
							<StepsInfo />
						) : title === "Flights" ? (
							<FlightsInfo />
						) : title === "Distance" ? (
							<DistanceInfo />
						) : null}
					</ScrollView>
				</Stack>
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
					<Pressable onPress={handlePresentModalPress} hitSlop={hitSlopLarge}>
						<InfoCircle color={theme.colors.infoStroke} size={25} />
					</Pressable>
				</Box>
				<Stack gutter="5px">
					<Box alignItems="center" paddingBottom="20px">
						<Text level="heading" size="26px" weight="bold">
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
							mode="dark"
						/>
						<Animated.View style={useShakeAnimationStyles}>
							<Text level="heading" size="28px">
								{goal}
								<Text size="12px" color="greyFour">
									{units}
								</Text>
							</Text>
						</Animated.View>
						<Chip
							label={`+${incrementBy}`}
							onPress={handlePlusGoal}
							a11yLabel="test"
							mode="dark"
						/>
					</Box>
					<Box alignItems="center" paddingTop="20px" paddingBottom="5px">
						<Text level="text" size="14px">
							Suggested goals:
						</Text>
					</Box>
					<Box marginVertical="5px">
						<Row gutter="2px" justifyContent="space-between">
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
										mode="dark"
									/>
								);
							})}
						</Row>
					</Box>
				</Stack>
			</Box>
		</>
	);
}
