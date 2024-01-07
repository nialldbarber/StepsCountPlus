import { ScreenHeader } from "@/app/components/screen-header";
import { Pressable } from "@/app/core/pressable";
import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { radii } from "@/app/design-system/radii";
import { space } from "@/app/design-system/space";
import type { Challenge } from "@/app/store/challenges";
import { useChallengesStore } from "@/app/store/challenges";
import type { LowercaseGoals } from "@/app/types/goals";
import { useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

export function CreateYourChallengeScreen() {
	const { navigate } = useNavigation();
	const { styles } = useStyles(stylesheet);
	const [customChallengeTitle, setCustomChallengeTitle] = useState("");
	const [customChallengeAmount, setCustomChallengeAmount] = useState("");
	const { setAddChallenge } = useChallengesStore(); // @TODO: add this in later

	const [currentChallenge, setCurrentChallenge] =
		useState<LowercaseGoals>("steps");

	const newChallenge: Challenge = {
		id: `${Math.random() * 1000}-custom-challenge`,
		title: `${customChallengeAmount}`, // @TODO:, format this
		difficulty: "easy", // @TODO:, programatically calculate difficulty?
		emoji: "🛠️",
		startDate: new Date().toISOString(),
		target: Number(customChallengeAmount),
		category: "custom",
	};

	function handleAddCustomAmount(text: string) {
		setCustomChallengeAmount(text);
	}

	function handleAddCustomTitle(text: string) {
		setCustomChallengeTitle(text);
	}

	function handleSelectChallenge(challenge: LowercaseGoals) {
		setCurrentChallenge(challenge);
	}

	function handleAddChallenge() {
		setAddChallenge(newChallenge);

		Toast.show({
			type: "success",
			text1: "Challenge added!",
			text2: "Click here to check it out 🚀",
			position: "bottom",
			bottomOffset: 100,
			onPress: () => navigate("ChallengesRoot"),
		});
		console.log(JSON.stringify(newChallenge, null, 2));
	}

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			resetScrollToCoords={{ x: 0, y: 0 }}
			scrollEnabled={false}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<Layout>
				<ScreenHeader title="" />
				<Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
					<Pressable
						onPress={() => handleSelectChallenge("steps")}
						style={styles.container(currentChallenge === "steps")}
					>
						<Text>👟</Text>
						<Text>Steps</Text>
					</Pressable>
					<Pressable
						onPress={() => handleSelectChallenge("flights")}
						style={styles.container(currentChallenge === "flights")}
					>
						<Text>🪜</Text>
						<Text>Flights</Text>
					</Pressable>
					<Pressable
						onPress={() => handleSelectChallenge("distance")}
						style={styles.container(currentChallenge === "distance")}
					>
						<Text>📍</Text>
						<Text>Distance</Text>
					</Pressable>
				</Box>
				<Box marginVertical="20px">
					<Stack gutter="10px">
						<Box>
							<Box paddingLeft="10px" paddingBottom="10px">
								<Text size="14px" color="greyFour">
									Add a custom title:
								</Text>
							</Box>
							<Input onChangeText={handleAddCustomTitle} maxLength={100} />
						</Box>
						<Box>
							<Box paddingLeft="10px" paddingBottom="10px">
								<Text size="14px" color="greyFour">
									Enter steps amount:
								</Text>
								<Text size="12px" color="greyFour">
									(minimum 1000 steps)
								</Text>
							</Box>
							<Input
								onChangeText={handleAddCustomAmount}
								keyboardType="number-pad"
								maxLength={9}
							/>
						</Box>
						<Box marginVertical="15px">
							<Button onPress={handleAddChallenge}>Add</Button>
						</Box>
					</Stack>
				</Box>
			</Layout>
		</KeyboardAwareScrollView>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: (isActive) => ({
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: space["8px"],
		borderRadius: radii.larger,
		minHeight: space["104px"],
		backgroundColor: colors.blackTwo,
		borderWidth: 2,
		borderColor: isActive ? colors.primary : colors.blackTwo,
	}),
}));
