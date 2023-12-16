import { ScreenHeader } from "@/app/components/screen-header";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import type { RootChallengesScreen } from "@/app/navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "SingleChallenge">;

export function SingleChallengeScreen({ route: { params } }: Props) {
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<ScreenHeader title={params.challengeType} />
			<Text>Hello from single challenge screen</Text>
		</Layout>
	);
}

const stylesheet = createStyleSheet(() => ({
	heading: {
		textTransform: "capitalize",
	},
}));
