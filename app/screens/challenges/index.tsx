import { ChallengeCard } from "@/app/components/challenge/card";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Chip } from "@/app/design-system/components/chip";
import { Layout } from "@/app/design-system/components/layout";
import { Row } from "@/app/design-system/components/row";
import { Text } from "@/app/design-system/components/text";
import { space } from "@/app/design-system/space";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { RootChallengesScreen } from "@/app/navigation/types";
import {
	ChallengeType,
	challengeTypes,
	useChallengesStore,
} from "@/app/store/challenges";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "ChallengesRoot">;

export function ChallengesScreen({ route }: Props) {
	const { styles, theme } = useStyles(stylesheet);
	const f = route?.params?.currentFilter;
	const filter = route?.params?.currentFilter ?? "Steps";

	console.log(f, filter);

	const [currentFilter, setCurrentFilter] = useState<ChallengeType>(filter);
	const { navigate } = useNavigation();
	const { challenges, setRemoveChallenge } = useChallengesStore();
	const { value, handleActiveValue } = useActiveValue();

	const filterChallengesByCategory = useMemo(() => {
		if (currentFilter.toLowerCase() === "all") {
			return challenges;
		}

		const filteredResults = challenges.filter((item) => {
			const category = item.category || item.id.split("-")[0];
			return (
				category.toLowerCase() ===
				currentFilter.toLowerCase().replaceAll(" ", "-")
			);
		});
		return filteredResults;
	}, [challenges, currentFilter]);

	return (
		<>
			<Layout>
				<Box flex={1}>
					<Bleed left="-20px" right="-20px" style={styles.bleed}>
						<Row
							marginHorizontal="15px"
							marginBottom="10px"
							gutter="6px"
							a11yRole="tablist"
							scroll
						>
							{challengeTypes.map(({ id, type }, index) => {
								return (
									<Chip
										key={id}
										label={type}
										onPress={() => {
											handleActiveValue(index);
											setCurrentFilter(type);
										}}
										a11yLabel="test"
										a11yRole="menu"
										hitSlop={hitSlopLarge}
										isSelected={index === value}
										size="16px"
										height="36px"
									/>
								);
							})}
						</Row>
					</Bleed>

					{challenges.length > 0 ? (
						<Box>
							<FlashList
								data={filterChallengesByCategory}
								estimatedItemSize={300}
								renderItem={({ item }) => (
									<ChallengeCard
										id={item.id}
										key={item.id}
										title={item.title}
										difficulty={item.difficulty}
										emoji={item.emoji}
										isSet
										fn={() => setRemoveChallenge(item.id)}
										startDate={item.startDate}
										target={item.target}
										category={item.category}
									/>
								)}
							/>
						</Box>
					) : (
						<Box>
							<Box justifyContent="center" paddingVertical="20px">
								<Text weight="bold">
									Looks like you haven't started a challenge!
								</Text>
							</Box>
							<Box
								justifyContent="center"
								alignItems="center"
								paddingTop="20px"
								paddingBottom="42px"
							>
								<Text level="heading" weight="bold" size="44px">
									🙈
								</Text>
							</Box>
						</Box>
					)}
				</Box>
			</Layout>
			<Box
				backgroundColor={theme.colors.screenBackgroundColor}
				paddingHorizontal="20px"
				paddingVertical="15px"
				shadow
			>
				<Button
					size="18px"
					weight="bold"
					color="white"
					onPress={() => navigate("SelectChallenge")}
				>
					Take on new challenge
				</Button>
			</Box>
		</>
	);
}

const stylesheet = createStyleSheet(() => ({
	bleed: {
		marginBottom: space["15px"],
	},
}));
