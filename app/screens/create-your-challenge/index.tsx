import { ScreenHeader } from "@/app/components/screen-header";
import { Pressable } from "@/app/core/pressable";
import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { radii } from "@/app/design-system/radii";
import { heights } from "@/app/design-system/size";
import { space } from "@/app/design-system/space";
import type { Challenge } from "@/app/store/challenges";
import { useChallengesStore } from "@/app/store/challenges";
import type { LowercaseGoals } from "@/app/types/goals";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function CreateYourChallengeScreen() {
	const { navigate } = useNavigation();
	const insets = useSafeAreaInsets();
	const { styles } = useStyles(stylesheet);
	const [customChallengeTitle, setCustomChallengeTitle] = useState("");
	const [customChallengeAmount, setCustomChallengeAmount] = useState("");
	const { setAddChallenge } = useChallengesStore(); // @TODO: add this in later

	const [currentChallenge, setCurrentChallenge] =
		useState<LowercaseGoals>("steps");

	const newChallenge: Challenge = {
		id: `${Math.random() * 1000}-custom-challenge`,
		title: customChallengeTitle,
		difficulty: "easy", // @TODO:, programatically calculate difficulty?
		emoji: "🛠️",
		startDate: new Date().toISOString(),
		target: Number(customChallengeAmount),
		category: currentChallenge,
	};

	/**
	 * Picking a category flow:
	 * - create a current category state
	 * - create a function to set the current category
	 */

	/**
	 * Flow:
	 * 1. user adds a new challenge
	 * 2. user selects a challenge type (steps, flights, distance)
	 * 3. user enters a custom title
	 * 4. user enters a custom amount
	 * 5. user clicks "add challenge"
	 *
	 * 6. user is navigated to the category defined screen
	 * Or
	 * 6. ability to add challenge to challenge list button appears
	 * 7. user clicks "add to challenge list"
	 * 8. user is navigated to the challenge list screen
	 *
	 *
	 * Considerations:
	 * - should user be limited by the challenges they can create?
	 * - should user be able to create a challenge with a custom emoji?
	 * - should user be able to create a challenge with a custom difficulty?
	 * - should user be able to create a challenge with a custom start date?
	 */

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

				{currentChallenge === "steps" && (
					<Box marginVertical="20px">
						<VStack gutter="10px">
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
								</Box>
								<Input
									onChangeText={handleAddCustomAmount}
									keyboardType="number-pad"
									maxLength={9}
								/>
							</Box>
						</VStack>
					</Box>
				)}

				{currentChallenge === "flights" && (
					<Box marginVertical="20px">
						<VStack gutter="10px">
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
										Enter flights amount:
									</Text>
								</Box>
								<Input
									onChangeText={handleAddCustomAmount}
									keyboardType="number-pad"
									maxLength={9}
								/>
							</Box>
						</VStack>
					</Box>
				)}

				{currentChallenge === "distance" && (
					<Box marginVertical="20px">
						<VStack gutter="10px">
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
										Enter distance amount:
									</Text>
								</Box>
								<Input
									onChangeText={handleAddCustomAmount}
									keyboardType="number-pad"
									maxLength={9}
								/>
							</Box>
						</VStack>
					</Box>
				)}
			</Layout>
			<Box
				position="absolute"
				bottom="0px"
				left="0px"
				right="0px"
				backgroundColor=""
				paddingHorizontal="20px"
				styles={styles.floatingButtonBackground(insets.bottom)}
			>
				<Box>
					<Button onPress={handleAddChallenge}>Add</Button>
				</Box>
				<Box paddingTop="20px">
					<Button variant="secondary" onPress={handleAddChallenge}>
						Add + begin
					</Button>
				</Box>
			</Box>
		</KeyboardAwareScrollView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
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
	floatingButtonBackground: (bottom) => ({
		backgroundColor: theme.colors.screenBackgroundColor,
		paddingBottom: bottom + heights["68px"],
	}),
}));
