import { ScreenHeader } from "@/app/components/screen-header";
import data from "@/app/data/challenges.json";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import type { RootChallengesScreen } from "@/app/navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "SingleChallenge">;

export function SingleChallengeScreen({ route: { params } }: Props) {
	const { styles, theme } = useStyles(stylesheet);
	const types: any = data.challenges.types[params.challengeType];

	return (
		<Layout>
			<ScreenHeader title={params.challengeType} />
			<Box marginTop="32px">
				<Stack gutter="10px">
					{types.map(({ title }) => (
						<Box
							backgroundColor={theme.colors.cardBackgroundColor}
							padding="20px"
							borderRadius="medium"
						>
							<Box flexDirection="row" justifyContent="space-between">
								<Text level="heading" size="18px">
									{title} Challenge
								</Text>
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
							<Box alignSelf="flex-start" paddingTop="20px">
								<Button shape="small" size="12px">
									Accept challenge
								</Button>
							</Box>
						</Box>
					))}
				</Stack>
			</Box>
		</Layout>
	);
}

const stylesheet = createStyleSheet(() => ({
	heading: {
		textTransform: "capitalize",
	},
}));
