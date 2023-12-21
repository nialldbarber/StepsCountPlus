import { ChallengeCard } from "@/app/components/challenge/card";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useChallengesStore } from "@/app/store/challenges";
import { useNavigation } from "@react-navigation/native";

export function ChallengesScreen() {
	const { navigate } = useNavigation();
	const { challenges, setRemoveChallenge } = useChallengesStore();

	return (
		<Layout>
			<Box flex={1}>
				<Text level="heading" size="26px" weight="bold">
					My challenges
				</Text>
				{challenges.length > 0 ? (
					<Box>
						{challenges.map(({ id, title, difficulty, startDate, target }) => {
							return (
								<>
									<ChallengeCard
										key={id}
										title={title}
										difficulty={difficulty}
										isSet
										fn={() => setRemoveChallenge(id)}
										startDate={startDate}
										target={target}
									/>
								</>
							);
						})}
						<Box>
							<Button
								size="20px"
								weight="bold"
								color="white"
								onPress={() => navigate("SelectChallenge")}
							>
								Take on new challenge
							</Button>
						</Box>
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
						<Box>
							<Button
								size="18px"
								weight="bold"
								color="white"
								onPress={() => navigate("SelectChallenge")}
							>
								Take on new challenge
							</Button>
						</Box>
					</Box>
				)}
			</Box>
		</Layout>
	);
}
