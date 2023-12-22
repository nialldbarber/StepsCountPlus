import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { radius } from "@/app/design-system/radius";
import { useEffectOnce } from "@/app/hooks/useEffectOnce";
import { getMeasurementFromDate } from "@/app/lib/activity/challenge";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import { determinePercentage } from "@/app/lib/format/numbers";
import type { ChallengeType } from "@/app/store/challenges";
import { Challenge } from "@/app/store/challenges";
import { Trash } from "iconsax-react-native";
import { useEffect, useMemo, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends Challenge {
	isSet?: boolean;
	fn: () => void;
	category: ChallengeType;
}

export function ChallengeCard({
	title,
	difficulty,
	emoji,
	isSet = false,
	startDate,
	target,
	category,
	fn,
}: Props) {
	const { styles, theme } = useStyles(stylesheet);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:Running:new",
			async () => {
				console.log("--> Running observer triggered");
			},
		);
	});

	useEffectOnce(() => {
		async function getPercentage() {
			try {
				if (!startDate) return;
				const finalPercentage = await getMeasurementFromDate(
					category,
					startDate,
				);

				// @TODO: make sure this works for flights
				console.log({
					finalPercentage,
				});

				if (
					category === "distance" ||
					category === "f1-tracks" ||
					category === "long-distance"
				) {
					setPercentage(convertMetersToKm(finalPercentage));
				} else {
					setPercentage(finalPercentage);
				}
			} catch (error) {
				console.error("shit");
			}
		}
		getPercentage();
	});

	const percent = useMemo(
		() => determinePercentage(percentage, target),
		[percentage, target],
	);

	return (
		<Box
			marginBottom="28px"
			position="relative"
			overflow="hidden"
			borderRadius="medium"
		>
			<Box backgroundColor={theme.colors.cardBackgroundColor} padding="20px">
				<Box flexDirection="row" justifyContent="space-between" flexWrap="wrap">
					<Box flexDirection="row">
						<Box paddingRight="20px">
							<Text>{emoji}</Text>
						</Box>
						<Text level="heading" size="18px">
							{title} {"\n"}challenge
						</Text>
					</Box>
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
							<Pressable onPress={fn} hitSlop={hitSlopLarge}>
								<Trash color={theme.colors.trashIconStroke} />
							</Pressable>
						</Box>
						<Box
							flexDirection="row"
							justifyContent="space-between"
							paddingTop="30px"
						>
							<Text size="14px">
								{determinePercentage(percentage, target)}% complete
							</Text>
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
			{isSet && <Box styles={styles.percent(percent)} />}
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
	percent: (percent) => ({
		position: "absolute",
		bottom: 0,
		left: 0,
		width: `${Number(percent)}%`,
		height: 4,
		backgroundColor: theme.colors.cardPercentStroke,
		borderRadius: radius.full,
	}),
}));
