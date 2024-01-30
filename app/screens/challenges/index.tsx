import { ChallengeChip } from "@/app/components/challenge/chip";
import { ChallengeItem } from "@/app/components/challenge/list-item";
import { Pressable } from "@/app/core/pressable";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { HStack } from "@/app/design-system/components/h-stack";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { space } from "@/app/design-system/space";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { actions } from "@/app/screens/challenges/constants";
import { ChallengeType, useChallengesStore } from "@/app/store/challenges";
import { MenuView } from "@react-native-menu/menu";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Filter } from "iconsax-react-native";
import { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

const { height } = Dimensions.get("screen");

export function ChallengesScreen() {
	const { styles, theme } = useStyles(stylesheet);

	const [currentFilter, setCurrentFilter] = useState<ChallengeType>("all");
	const [currentFilterScreen, setCurrentFilterScreen] = useState<
		"in-progress" | "completed"
	>("in-progress");

	const { navigate } = useNavigation();
	const { challenges, completedChallenges, setRemoveChallenge } =
		useChallengesStore();

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
		<Layout>
			<Box>
				<Bleed left="-20px" right="-20px" style={styles.bleed}>
					<HStack marginHorizontal="15px" a11yRole="tablist" scroll>
						<Box flexDirection="row">
							<ChallengeChip
								label="In Progress"
								isSelected={currentFilterScreen === "in-progress"}
								fn={() => setCurrentFilterScreen("in-progress")}
							/>
							<ChallengeChip
								label="Completed"
								isSelected={currentFilterScreen === "completed"}
								fn={() => setCurrentFilterScreen("completed")}
							/>
							<ChallengeChip
								label="Add new"
								isSelected={false}
								fn={() => navigate("SelectChallenge")}
							/>
						</Box>
					</HStack>
				</Bleed>

				<Box
					paddingBottom="20px"
					flexDirection="row"
					alignItems="center"
					justifyContent="flex-end"
				>
					<Text size="12px">Filter: </Text>
					<Filter size={20} color={theme.colors.filterStroke} />
					<MenuView
						style={styles.menu}
						title="Filter by category"
						themeVariant={
							UnistylesRuntime.themeName === "dark" ? "dark" : "light"
						}
						onPressAction={({ nativeEvent }) => {
							setCurrentFilter(nativeEvent.event as ChallengeType);
						}}
						actions={actions}
					>
						<Pressable forceHaptic>
							<Box
								alignSelf="flex-end"
								backgroundColor={theme.colors.chipFilterBackground}
								paddingVertical="5px"
								paddingHorizontal="15px"
								borderRadius="full"
								marginLeft="5px"
							>
								<Text>{capitaliseFirstLetter(currentFilter)}</Text>
							</Box>
						</Pressable>
					</MenuView>
				</Box>

				{currentFilterScreen === "completed" ? (
					<Box flex={1} flexGrow={1} minHeight="2px">
						{completedChallenges.length > 0 ? (
							<>
								<Box flex={1} flexGrow={1} minHeight="2px">
									<FlashList
										data={completedChallenges}
										estimatedItemSize={200}
										renderItem={({ item, index }) => (
											<ChallengeItem
												item={item}
												index={index}
												challengeType="complete"
											/>
										)}
									/>
								</Box>
							</>
						) : (
							<Box
								flex={1}
								styles={{ height: height / 2 }}
								alignItems="center"
								justifyContent="center"
							>
								<Box justifyContent="center" paddingVertical="20px">
									<Text weight="bold" textStyles={styles.textEmpty}>
										Looks like you haven't {"\n"} completed a challenge!
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
								<Button
									onPress={() => navigate("SelectChallenge")}
									color="white"
								>
									Start a Challenge
								</Button>
							</Box>
						)}
					</Box>
				) : filterChallengesByCategory.length > 0 ? (
					<Box flex={1} flexGrow={1} minHeight="2px">
						<FlashList
							data={filterChallengesByCategory}
							estimatedItemSize={200}
							renderItem={({ item, index }) => (
								<ChallengeItem
									item={item}
									index={index}
									fn={setRemoveChallenge}
									challengeType="current"
								/>
							)}
						/>
					</Box>
				) : (
					<Box
						flex={1}
						styles={{ height: height / 2 }}
						alignItems="center"
						justifyContent="center"
					>
						<Box justifyContent="center" paddingVertical="20px">
							<Text weight="bold" textStyles={styles.textEmpty}>
								{filterChallengesByCategory.length === 0
									? `Looks like you haven't started \n one of these challenges yet!`
									: `Looks like you haven't \n started a challenge!`}
							</Text>
						</Box>
						<Box
							justifyContent="center"
							alignItems="center"
							paddingTop="20px"
							paddingBottom="36px"
						>
							<Text level="heading" weight="bold" size="44px">
								🙈
							</Text>
						</Box>
						<Button onPress={() => navigate("SelectChallenge")} color="white">
							Start a Challenge
						</Button>
					</Box>
				)}
			</Box>
		</Layout>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	bleed: {
		marginBottom: space["15px"],
	},
	text: {
		marginTop: space["6px"],
	},
	textEmpty: {
		textAlign: "center",
	},
	menu: {
		alignSelf: "flex-end",
	},
}));
