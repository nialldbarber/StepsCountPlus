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
	steps: "Steps",
	distance: "Distance",
	flights: "Flights",
	"long-distance-runs": "Long Distance Runs",
	"f1-tracks": "F1 Tracks",
};

const CHALLENGE_EMOJI_TYPES: Record<string, string> = {
	steps: "👟",
	distance: "📍",
	flights: "🪜",
	"long-distance-runs": "🏃",
	"f1-tracks": "🏎️",
};

const CHALLENGE_DESC_TYPES: Record<string, string> = {
	steps:
		"Make every step count in a quest for fitness, turning daily strides into exciting mini-adventures",
	distance:
		"Embark on a journey of endurance and discovery, measuring your progress one step at a time",
	flights:
		"Travel the world through fitness, connecting iconic landmarks like the Statue of Liberty and Burj Khalifa with each workout",
	"long-distance-runs":
		"Channel your inner Olympian with challenges inspired by legendary runs, from swift sprints to marathons",
	"f1-tracks":
		"Experience the thrill of Formula 1 by tackling challenges modeled on world-famous tracks, blending speed with strategy",
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
				onPress={() => navigate("SingleChallenge", { challengeType })}
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
						<Text textStyles={styles.text} size="11px">
							{CHALLENGE_DESC_TYPES[challengeType]}
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
	text: {
		lineHeight: 14,
	},
}));
