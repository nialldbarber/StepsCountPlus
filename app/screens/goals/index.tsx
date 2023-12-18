import { DailyDistanceGoal } from "@/app/components/goals/distance";
import { DailyFlightsGoal } from "@/app/components/goals/flights";
import { DailyStepsGoal } from "@/app/components/goals/steps";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Pressable } from "@/app/design-system/components/pressable";
// import { Pressable } from "@/design-system/components/common/pressable";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";

export function GoalsScreen() {
	const bottomSheetRef = useRef(null);
	const { snapPoints, handlePresentModalPress } =
		useBottomSheet(bottomSheetRef);

	return (
		<BottomSheetModalProvider>
			<Layout>
				<Stack gutter="10px">
					<Text level="heading">
						Set your steps, flights, and distance goals and track your{" "}
						<Pressable onPress={handlePresentModalPress}>
							<Text level="heading" color="primary">
								progress
							</Text>
						</Pressable>
						.
					</Text>
					{/* </Text> */}
					<DailyStepsGoal />
					<DailyFlightsGoal />
					<DailyDistanceGoal />
				</Stack>
			</Layout>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				backdropComponent={BottomSheetBackdrop}
			>
				<Stack margin="20px">
					<Box>
						<Text>Infoooooooooo</Text>
					</Box>
				</Stack>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
}
