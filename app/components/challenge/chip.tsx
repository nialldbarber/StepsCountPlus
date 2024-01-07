import { Pressable } from "@/app/core/pressable";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	label: string;
	isSelected?: boolean;
	fn?: (...args: unknown[]) => void;
};

export function ChallengeChip({ label, isSelected, fn }: Props) {
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Pressable onPress={() => fn?.(label)}>
			<Box
				backgroundColor={theme.colors.chipChallengesBackground}
				paddingVertical="5px"
				paddingHorizontal="15px"
				borderRadius="full"
				marginHorizontal="5px"
				borderWidth={1}
				styles={styles.currentFilterScreen(isSelected)}
			>
				<Text textStyles={styles.challengeChipText}>{label}</Text>
			</Box>
		</Pressable>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	currentFilterScreen: (isActive) => ({
		borderWidth: 2,
		borderColor: isActive
			? theme.colors.chipChallengesActiveBorder
			: theme.colors.chipChallengesBorder,
	}),
	challengeChipText: {
		color: theme.colors.chipChallengesColor,
	},
}));
