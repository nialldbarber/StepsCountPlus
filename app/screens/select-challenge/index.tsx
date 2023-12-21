import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";

export function SelectChallengeScreen() {
	return (
		<Layout>
			<ScreenHeader title="Choose a category" />
			<Box gap="20px" justifyContent="center" marginTop="20px">
				<Card challengeType="steps" />
				<Card challengeType="distance" />
				<Card challengeType="flights" />
				<Card challengeType="long-distance-runs" />
				<Card challengeType="f1-tracks" />
			</Box>
		</Layout>
	);
}
