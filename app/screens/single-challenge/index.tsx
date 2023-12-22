import { ChallengeCard } from "@/app/components/challenge/card";
import { InfoModal } from "@/app/components/info-modal";
import { ScreenHeader } from "@/app/components/screen-header";
import data from "@/app/data/challenges.json";
import { Box } from "@/app/design-system/components/box";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import type { RootChallengesScreen } from "@/app/navigation/types";
import type { Challenge, ChallengeType } from "@/app/store/challenges";
import { useChallengesStore } from "@/app/store/challenges";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "SingleChallenge">;

export function SingleChallengeScreen({ route: { params } }: Props) {
	const bottomSheetRef = useRef(null);
	const [filterValue, setFilterValue] = useState("");

	const { theme } = useStyles();
	const { navigate } = useNavigation();
	const { challenges, setAddChallenge } = useChallengesStore();

	const { handlePresentModalPress } = useBottomSheet(bottomSheetRef);

	const challengeType = params.challengeType as ChallengeType;
	const allAvailableChallenges: Challenge[] = Array.isArray(
		data.challenges.types[challengeType],
	)
		? data.challenges.types[challengeType]
		: [];

	const availableChallenges = allAvailableChallenges
		.filter((ac) => !challenges.some((c) => c.id === ac.id))
		.filter((ch) => {
			return ch.title.toLowerCase().includes(filterValue.toLowerCase());
		});

	function handleFilterValue(text: string) {
		setFilterValue(text);
	}

	function invokeAddNewChallenge(challenge: Challenge) {
		const checkIfUserHasOtherChallengesInProgress = !!challenges.find(
			(c) => c.category === challenge.category,
		);

		if (checkIfUserHasOtherChallengesInProgress) {
			Toast.show({
				type: "error",
				text1: `${capitaliseFirstLetter(
					challenge.category,
				)} already in progress`,
				text2: "You can only accept 1 challenge per category",
				position: "bottom",
				bottomOffset: 100,
			});
			return;
		}

		try {
			setAddChallenge(challenge);
			Toast.show({
				type: "success",
				text1: "Added successfully!",
				text2: "Click here to check it out 🚀",
				position: "bottom",
				onPress: () =>
					// @TODO: this doesn't work correctly
					navigate("ChallengesRoot", { currentFilter: challenge.category }),
				bottomOffset: 100,
			});
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Oops!",
				text2:
					"Looks like there was an error 😔 - try adding the challenge again",
				position: "bottom",
				bottomOffset: 100,
			});
		}
	}

	return (
		<>
			<Layout>
				<Box>
					<ScreenHeader title={params.challengeType} />
					<Box position="absolute" top="5px" right="0px">
						<InfoModal handlePresentModalPress={handlePresentModalPress} />
					</Box>
				</Box>
				<Box marginTop="20px">
					<Input
						value={filterValue}
						placeholder="Search"
						onChangeText={handleFilterValue}
						handleDeleteValue={() => setFilterValue("")}
					/>
				</Box>
				<Box marginTop="32px">
					<Stack>
						{availableChallenges.length === 0 ? (
							<Box>
								<Text>hello</Text>
							</Box>
						) : (
							// TODO: option to randomise (thinking runs and f1 tracks)
							availableChallenges.map((challenge) => {
								const { id, title, difficulty, emoji, target, category } =
									challenge;
								const timestamp = new Date().toISOString();
								return (
									<ChallengeCard
										id={id}
										key={id}
										title={title}
										difficulty={difficulty}
										target={target}
										category={category}
										emoji={emoji}
										fn={() =>
											invokeAddNewChallenge({
												...challenge,
												startDate: timestamp,
											})
										}
									/>
								);
							})
						)}
					</Stack>
				</Box>
			</Layout>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={["50%", "50%"]}
				backdropComponent={BottomSheetBackdrop}
				backgroundStyle={{
					backgroundColor: theme.colors.modalBackgroundColor,
				}}
			>
				<Stack margin="20px" gutter="10px">
					<Box>
						<Text level="heading" size="23px" withEmoji>
							Accepting challenges 📜
						</Text>
					</Box>
					<Box>
						<Text>One challenge at a time:</Text>
						<Text weight="medium" size="14px">
							Accept only one challenge per category. Whether it’s steps,
							flights, distances, or any of our unique challenges, your choice
							matters
						</Text>
					</Box>
					<Box>
						<Text>Make It Count:</Text>
						<Text weight="medium" size="14px">
							Once you choose a challenge in a category, dive into it
							wholeheartedly. You can only move to a new challenge in the same
							category after completing or leaving the current one
						</Text>
					</Box>
					<Box>
						<Text>Celebrate Your Achievement:</Text>
						<Text weight="medium" size="14px">
							Complete your challenge to unlock the ability to take on a new one
							in the same category
						</Text>
					</Box>
				</Stack>
			</BottomSheetModal>
		</>
	);
}
