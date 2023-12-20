import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";
import { useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";
import { z } from "zod";

/**
 * this should show "my challenges"
 *
 * there should be a button that takes you to the take on a new challenge
 */

const ChallengeSchema = z.object({
	id: z.string(),
	title: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	emoji: z.string(),
});

const ChallengesSchema = z.object({
	distance: z.array(ChallengeSchema).optional(),
	flights: z.array(ChallengeSchema).optional(),
	longDistanceRuns: z.array(ChallengeSchema).optional(),
	f1Tracks: z.array(ChallengeSchema).optional(),
});

const MainSchema = z.object({
	challenges: z.object({
		types: ChallengesSchema,
	}),
});

export function SelectChallengeScreen() {
	const { navigate, goBack } = useNavigation();
	const { theme } = useStyles();

	return (
		<Layout>
			<ScreenHeader title="Select a challenge" />
			<Box
				gap="20px"
				justifyContent="center"
				marginTop="20px"
				paddingBottom="150px"
			>
				<Card challengeType="distance" />
				<Card challengeType="flights" />
				<Card challengeType="long-distance-runs" />
				<Card challengeType="f1-tracks" />
			</Box>
		</Layout>
	);
}
