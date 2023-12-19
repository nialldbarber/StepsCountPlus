import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";
import { useStyles } from "react-native-unistyles";

/**
 * this should show "my challenges"
 *
 * there should be a button that takes you to the take on a new challenge
 */

export function SelectChallengeScreen() {
	const { navigate, goBack } = useNavigation();
	const { theme } = useStyles();

	return (
		<>
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
			<Box
				left="0px"
				right="0px"
				paddingTop="20px"
				paddingHorizontal="20px"
				position="absolute"
				bottom="0px"
				alignSelf="center"
				backgroundColor={theme.colors.bottomTabsBackgroundColor}
				zIndex="2px"
				shadow
			>
				<Text
					level="heading"
					withEmoji
					textStyles={{ lineHeight: 25, textAlign: "center" }}
				>
					Or...👀
				</Text>
				<Box padding="20px">
					<Button color="pureWhite">Create YOUR challenge</Button>
				</Box>
			</Box>
		</>
	);
}
