import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { Trash } from "iconsax-react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	title: string;
	difficulty: "easy" | "medium" | "hard";
	isSet?: boolean;
	fn: () => void;
};

export function ChallengeCard({ title, difficulty, isSet = false, fn }: Props) {
	const { styles, theme } = useStyles(stylesheet);

	return (
		<Box
			backgroundColor={theme.colors.cardBackgroundColor}
			padding="20px"
			borderRadius="medium"
		>
			<Box flexDirection="row" justifyContent="space-between">
				<Text level="heading" size="18px">
					{title} Challenge
				</Text>
				<Box>
					<Box
						backgroundColor="greyFour"
						borderRadius="full"
						paddingVertical="6px"
						paddingHorizontal="6px"
						alignItems="center"
						justifyContent="center"
						marginBottom="10px"
						styles={styles.difficultyBadge(difficulty)}
					>
						<Text size="12px" color="black">
							{difficulty}
						</Text>
					</Box>
					<Box
						backgroundColor="greyFour"
						borderRadius="full"
						paddingVertical="6px"
						paddingHorizontal="6px"
						alignItems="center"
						justifyContent="center"
					>
						<Text size="12px">{title}</Text>
					</Box>
				</Box>
			</Box>
			{isSet ? (
				<Box>
					<Pressable onPress={fn}>
						<Trash color={theme.colors.trashIconStroke} />
					</Pressable>
				</Box>
			) : (
				<Box alignSelf="center" paddingTop="20px">
					<Button shape="small" size="12px" onPress={fn}>
						Accept challenge
					</Button>
				</Box>
			)}
		</Box>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	difficultyBadge: (difficulty) => ({
		backgroundColor:
			difficulty === "easy"
				? theme.colors.cardSuccess
				: difficulty === "medium"
				  ? theme.colors.cardWarning
				  : theme.colors.cardError,
	}),
}));
