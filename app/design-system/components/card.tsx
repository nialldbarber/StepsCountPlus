import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import type { ChallengeTypes } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	challengeType: ChallengeTypes;
};

const CHALLENGE_TYPES: Record<string, string> = {
	distance: "Distance",
	flights: "Flights",
	"long-distance-runs": "Long Distance Runs",
	"f1-tracks": "F1 Tracks",
};

const CHALLENGE_EMOJI_TYPES: Record<string, string> = {
	distance: "📍",
	flights: "🪜",
	"long-distance-runs": "🏃",
	"f1-tracks": "🏎️",
};

export function Card({ challengeType }: Props) {
	const { navigate } = useNavigation();
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Box
			position="relative"
			backgroundColor={theme.colors.cardBackgroundColor}
			padding="20px"
			borderRadius="large"
			minHeight="120px"
			shadow
		>
			<Pressable
				style={styles.button}
				onPress={() => {
					console.log("hello");
					navigate("SingleChallenge", { challengeType });
				}}
			>
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="flex-start"
					width="full"
				>
					<Box
						backgroundColor="orange_light"
						marginLeft="20px"
						marginRight="24px"
						height="80px"
						width="80px"
						alignItems="center"
						justifyContent="center"
						borderRadius="full"
					>
						<Text level="heading" size="44px">
							{CHALLENGE_EMOJI_TYPES[challengeType]}
						</Text>
					</Box>
					<Box flex={1} paddingRight="20px">
						<Text>{CHALLENGE_TYPES[challengeType]}</Text>
						<Text size="11px">
							Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
						</Text>
					</Box>
				</Box>
			</Pressable>
		</Box>
	);
}

const stylesheet = createStyleSheet(() => ({
	button: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center",
	},
}));
