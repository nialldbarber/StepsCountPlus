import { LinkingOptions } from "@react-navigation/native";

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
	prefixes: ["fantasyhealthtracker://"],
	config: {
		initialRouteName: "Home",
		screens: {
			Home: {
				path: "home",
				screens: {
					Stats: {
						path: "stats",
					},
					Challenges: {
						path: "challenges",
					},
					Goals: {
						path: "goals",
					},
				},
			},
			Settings: {
				path: "settings",
			},
		},
	},
};
