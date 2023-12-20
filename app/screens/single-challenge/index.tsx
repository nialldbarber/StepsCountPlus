import { ScreenHeader } from "@/app/components/screen-header";
import data from "@/app/data/challenges.json";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import type { RootChallengesScreen } from "@/app/navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "SingleChallenge">;

type ChallengeType =
	| "distance"
	| "flights"
	| "long-distance-runs"
	| "f1-tracks";

type Challenge = {
	id: string;
	title: string;
	difficulty: "easy" | "medium" | "hard";
	emoji: string;
};

export function SingleChallengeScreen({ route: { params } }: Props) {
	const { styles, theme } = useStyles(stylesheet);
	const challengeType = params.challengeType as ChallengeType;
	const challenges: Challenge[] = Array.isArray(
		data.challenges.types[challengeType],
	)
		? (data.challenges.types[challengeType] as Challenge[])
		: [];

	return (
		<Layout>
			<ScreenHeader title={params.challengeType} />
			<Box marginTop="32px">
				<Stack gutter="10px">
					{challenges.map(({ id, title, difficulty, emoji }) => (
						<Box
							key={id}
							backgroundColor={theme.colors.cardBackgroundColor}
							padding="20px"
							borderRadius="medium"
						>
							<Box flexDirection="row" justifyContent="space-between">
								<Text level="heading" size="18px">
									{title} Challenge
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
											{difficulty}
										</Text>
									</Box>
									<Box
										backgroundColor="greyFour"
										borderRadius="full"
										paddingVertical="6px"
										paddingHorizontal="6px"
										alignItems="center"
										justifyContent="center"
									>
										<Text size="12px">{title}</Text>
									</Box>
								</Box>
							</Box>
							<Box alignSelf="center" paddingTop="20px">
								<Button shape="small" size="12px">
									Accept challenge
								</Button>
							</Box>
						</Box>
					))}
				</Stack>
			</Box>
		</Layout>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	heading: {
		textTransform: "capitalize",
	},
	difficultyBadge: (difficulty) => ({
		backgroundColor:
			difficulty === "easy"
				? theme.colors.cardSuccess
				: difficulty === "medium"
				  ? theme.colors.cardWarning
				  : theme.colors.cardError,
	}),
}));
