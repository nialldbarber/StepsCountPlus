import { InfoModal } from "@/app/components/info-modal";
import { ScreenHeader } from "@/app/components/screen-header";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function SelectChallengeScreen() {
	const bottomSheetRef = useRef(null);
	const { styles, theme } = useStyles(stylesheet);
	const { handlePresentModalPress } = useBottomSheet(bottomSheetRef);

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={["20%", "30%"]}
				backdropComponent={BottomSheetBackdrop}
				backgroundStyle={{
					backgroundColor: theme.colors.modalBackgroundColor,
				}}
			>
				<VStack margin="20px">
					<ScrollView showsVerticalScrollIndicator={false}>
						<Box paddingBottom="20px">
							<Text size="14px" weight="medium" textStyles={styles.text}>
								You may only have one challenge active at a time.
							</Text>
						</Box>
						<Box paddingBottom="20px">
							<Text size="14px" weight="medium" textStyles={styles.text}>
								Why? You may ask. Well, we want you to focus on one challenge at
								a time, so you can give it your all and not be distracted by
								other challenges!
							</Text>
						</Box>
					</ScrollView>
				</VStack>
			</BottomSheetModal>

			<Layout>
				<ScreenHeader title="Choose a category" />
				<Box position="absolute" right="19px" top="19px">
					<InfoModal handlePresentModalPress={handlePresentModalPress} />
				</Box>
				<Bleed left="-10px" right="-10px">
					<Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
						<Card challengeType="custom" />
						<Card challengeType="steps" />
						<Card challengeType="distance" />
						<Card challengeType="flights" />
						<Card challengeType="long-distance" />
						<Card challengeType="f1-tracks" />
						<Card challengeType="cycling" />
					</Box>
				</Bleed>
			</Layout>
		</>
	);
}

const stylesheet = createStyleSheet(() => ({
	text: {
		lineHeight: 25,
	},
}));
