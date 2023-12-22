import { ChallengeCard } from "@/app/components/challenge/card";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { colors } from "@/app/design-system/colors";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { Layout } from "@/app/design-system/components/layout";
import { Pressable } from "@/app/design-system/components/pressable";
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
	const [currentFilterScreen, setCurrentFilterScreen] = useState<
		"in-progress" | "completed"
	>("in-progress");

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

	console.log(JSON.stringify(challenges, null, 2));

	return (
		<Layout>
			<Box flex={1}>
				<Bleed left="-20px" right="-20px" style={styles.bleed}>
					<Row
						marginHorizontal="20px"
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

				<Bleed left="-20px" right="-20px" style={styles.bleed}>
					<Row marginHorizontal="15px" a11yRole="tablist" scroll>
						<Box flexDirection="row" marginBottom="20px">
							<Pressable onPress={() => setCurrentFilterScreen("in-progress")}>
								<Box
									backgroundColor="blackTwo"
									paddingVertical="5px"
									paddingHorizontal="15px"
									borderRadius="full"
									marginHorizontal="5px"
									borderWidth={1}
									styles={styles.currentFilterScreen(
										currentFilterScreen === "in-progress",
									)}
								>
									<Text>In Progress</Text>
								</Box>
							</Pressable>
							<Pressable onPress={() => setCurrentFilterScreen("completed")}>
								<Box
									backgroundColor="blackTwo"
									paddingVertical="5px"
									paddingHorizontal="15px"
									borderRadius="full"
									marginHorizontal="5px"
									borderWidth={1}
									styles={styles.currentFilterScreen(
										currentFilterScreen === "completed",
									)}
								>
									<Text>Completed</Text>
								</Box>
							</Pressable>
							<Pressable onPress={() => navigate("SelectChallenge")}>
								<Box
									backgroundColor="blackTwo"
									paddingVertical="5px"
									paddingHorizontal="15px"
									borderRadius="full"
									marginHorizontal="5px"
									borderWidth={1}
								>
									<Text>Add New</Text>
								</Box>
							</Pressable>
						</Box>
					</Row>
				</Bleed>

				{currentFilterScreen === "completed" ? (
					<Box>
						<Text>COMPLETED</Text>
					</Box>
				) : challenges.length > 0 ? (
					<Box>
						<FlashList
							data={filterChallengesByCategory}
							estimatedItemSize={300}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => navigate("CurrentChallenge", { challenge: 1 })}
								>
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
								</Pressable>
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
	);
}

const stylesheet = createStyleSheet(() => ({
	bleed: {
		marginBottom: space["15px"],
	},
	text: {
		marginTop: space["6px"],
	},
	currentFilterScreen: (isActive) => ({
		borderColor: isActive ? colors.primary : colors.blackTwo,
	}),
}));
