import { ChallengeCard } from "@/app/components/challenge/card";
import { ScreenHeader } from "@/app/components/screen-header";
import data from "@/app/data/challenges.json";
import { Box } from "@/app/design-system/components/box";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import type { RootChallengesScreen } from "@/app/navigation/types";
import { useChallengesStore } from "@/app/store/challenges";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootChallengesScreen, "SingleChallenge">;

type ChallengeType =
	| "distance"
	| "flights"
	| "long-distance-runs"
	| "f1-tracks";

type Challenge = {
	id: string;
	title: string;
	difficulty: "easy" | "medium" | "hard";
	emoji: string;
};

export function SingleChallengeScreen({ route: { params } }: Props) {
	const [filterValue, setFilterValue] = useState("");

	const { navigate } = useNavigation();
	const { challenges, setAddChallenge } = useChallengesStore();

	const challengeType = params.challengeType as ChallengeType;
	// @ts-expect-error
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
		try {
			setAddChallenge(challenge);
			Toast.show({
				type: "success",
				text1: "Added successfully!",
				text2: "Click here to check it out 🚀",
				position: "bottom",
				onPress: () => navigate("ChallengesRoot"),
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
		<Layout>
			<ScreenHeader title={params.challengeType} />
			<Box marginTop="20px">
				<Input
					value={filterValue}
					placeholder="Search"
					onChangeText={handleFilterValue}
					handleDeleteValue={() => setFilterValue("")}
				/>
			</Box>
			<Box marginTop="32px">
				<Stack gutter="10px">
					{availableChallenges.length === 0 ? (
						<Box>
							<Text>hello</Text>
						</Box>
					) : (
						availableChallenges.map((challenge) => {
							const { id, title, difficulty, emoji } = challenge;
							return (
								<ChallengeCard
									key={id}
									title={title}
									difficulty={difficulty}
									fn={() => invokeAddNewChallenge(challenge)}
								/>
							);
						})
					)}
				</Stack>
			</Box>
		</Layout>
	);
}
