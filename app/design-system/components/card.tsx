import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import type { ChallengeTypes } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	challengeType: ChallengeTypes;
};

export function Card({ challengeType }: Props) {
	const { navigate } = useNavigation();
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Box
			position="relative"
			flexBasis="48%"
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
				<Text>{challengeType}</Text>
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
