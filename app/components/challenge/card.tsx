import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { getMeasurementFromDate } from "@/app/lib/activity/challenge";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { determinePercentage } from "@/app/lib/format/numbers";
import { Challenge } from "@/app/store/challenges";
import { Trash } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends Challenge {
	isSet?: boolean;
	fn: () => void;
}

export function ChallengeCard({
	title,
	difficulty,
	isSet = false,
	startDate,
	target,
	fn,
}: Props) {
	const { styles, theme } = useStyles(stylesheet);
	const [percentage, setPercentage] = useState(null);

	useEffect(() => {
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:Running:new",
			async () => {
				console.log("--> Running observer triggered");
			},
		);
	});

	useEffect(() => {
		async function getPercentage() {
			try {
				if (!startDate) return;
				const p = await getMeasurementFromDate("steps", startDate);
				setPercentage(p);
			} catch (error) {
				console.error("shit");
			}
		}
		getPercentage();
	});

	return (
		<Box
			backgroundColor={theme.colors.cardBackgroundColor}
			padding="20px"
			borderRadius="medium"
			marginBottom="28px"
		>
			<Box flexDirection="row" justifyContent="space-between" flexWrap="wrap">
				<Text level="heading" size="18px">
					{title} {"\n"}challenge
				</Text>
				<Box>
					<Box
						backgroundColor="greyFour"
						borderRadius="full"
						paddingVertical="6px"
						paddingHorizontal="6px"
						alignItems="center"
						justifyContent="center"
						marginBottom="10px"
						styles={styles.difficultyBadge(difficulty)}
					>
						<Text size="12px" color="black">
							{capitaliseFirstLetter(difficulty)}
						</Text>
					</Box>
				</Box>
			</Box>
			{isSet ? (
				<>
					<Box position="absolute" bottom="15px" right="15px">
						<Pressable onPress={fn}>
							<Trash color={theme.colors.trashIconStroke} />
						</Pressable>
					</Box>
					<Box
						flexDirection="row"
						justifyContent="space-between"
						paddingTop="30px"
					>
						<Text>{determinePercentage(percentage, target)}% complete</Text>
					</Box>
				</>
			) : (
				<Box alignSelf="center" paddingTop="20px">
					<Button shape="small" size="12px" onPress={fn}>
						Accept challenge
					</Button>
				</Box>
			)}
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	difficultyBadge: (difficulty) => ({
		backgroundColor:
			difficulty === "easy"
				? theme.colors.cardSuccess
				: difficulty === "medium"
				  ? theme.colors.cardWarning
				  : theme.colors.cardError,
	}),
}));
