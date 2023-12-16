import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";

/**
 * this should show "my challenges"
 *
 * there should be a button that takes you to the take on a new challenge
 */

export function ChallengesScreen() {
	const { navigate } = useNavigation();

	return (
		<Layout>
			<Box>
				<Text level="heading" size="26px" weight="bold">
					My challenges
				</Text>
				<Box
					justifyContent="center"
					// backgroundColor="destructive"
					paddingVertical="20px"
				>
					<Text weight="bold">Looks like you havent started a challenge!</Text>
				</Box>
				<Box>
					<Button
						size="20px"
						weight="bold"
						color="white"
						onPress={() => navigate("SelectChallenge")}
					>
						Take on new challenge
					</Button>
				</Box>
				{/* <Box
				gap="10px"
				flexWrap="wrap"
				flexDirection="row"
				justifyContent="center"
				marginTop="20px"
			>
				<Card challengeType="distance" />
				<Card challengeType="flights" />
				<Card challengeType="long-distance-runs" />
				<Card challengeType="f1-tracks" />
			</Box> */}
			</Box>
		</Layout>
	);
}
