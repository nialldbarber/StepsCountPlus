import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";
import { useNavigation } from "@react-navigation/native";

/**
 * this should show "my challenges"
 *
 * there should be a button that takes you to the take on a new challenge
 */

export function SelectChallengeScreen() {
	const { navigate, goBack } = useNavigation();

	return (
		<Layout>
			<ScreenHeader title="Select a challenge" />
			<Box
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
			</Box>
		</Layout>
	);
}
