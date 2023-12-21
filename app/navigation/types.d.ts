import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamsList = {
	Home: undefined;
	Authentication: undefined;
	SignUp: undefined;
	Settings: undefined;
	Premium: undefined;
	NewChallenge: undefined;
};

export type RootBottomTabsParamList = {
	Stats: undefined;
	Goals: undefined;
	Insights: undefined;
	Challenges: undefined;
};

export type ChallengeTypes =
	| "steps"
	| "distance"
	| "flights"
	| "long-distance-runs"
	| "f1-tracks"
	| "emphasise";

export type RootChallengesScreen = {
	ChallengesRoot: undefined;
	SelectChallenge: undefined;
	SingleChallenge: { challengeType: ChallengeTypes };
};

export type RootSettingsScreen = {
	SettingsRoot: undefined;
	PrivacyPolicy: undefined;
	GiveFeedback: undefined;
	RateApp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
	StackScreenProps<RootStackParamsList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<HomeTabParamList, T>,
		RootStackScreenProps<keyof RootStackParamList>
	>;

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends RootStackParamsList,
				RootBottomTabsParamList,
				RootChallengesScreen,
				RootSettingsScreen {}
	}
}
