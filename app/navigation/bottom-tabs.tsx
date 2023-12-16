import { colors } from "@/app/design-system/colors";
import type { LowercaseKeys } from "@/app/lib/misc-types";
import { ChallengeStack } from "@/app/navigation/challenges-stack";
import { Header } from "@/app/navigation/header";
import type { RootBottomTabsParamList } from "@/app/navigation/types";
import { GoalsScreen } from "@/app/screens/goals";
import { StatsScreen } from "@/app/screens/stats";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Award, Chart, StatusUp } from "iconsax-react-native";

const Tab = createBottomTabNavigator<RootBottomTabsParamList>();

// modal: settings
//
//               new challenge
//                    |
// home | goals | challenges

const tabBarTintColors = {
	tabBarInactiveTintColor: colors.black,
	tabBarActiveTintColor: colors.primary,
};

type Focused = { focused: boolean };
const TABS = {
	STATS: {
		tabBarIcon: ({ focused }: Focused) => (
			<Chart color={focused ? colors.primary : colors.black} />
		),
		header: () => <Header header="stats" />,
		...tabBarTintColors,
	},
	CHALLENGES: {
		tabBarIcon: ({ focused }: Focused) => (
			<StatusUp color={focused ? colors.primary : colors.black} />
		),
		header: () => <Header header="challenges" />,
		...tabBarTintColors,
	},
	GOALS: {
		tabBarIcon: ({ focused }: Focused) => (
			<Award color={focused ? colors.primary : colors.black} />
		),
		header: () => <Header header="goals" />,
		...tabBarTintColors,
	},
};
export type Tabs = keyof LowercaseKeys<typeof TABS>;

export function BottomTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Stats" component={StatsScreen} options={TABS.STATS} />
			<Tab.Screen
				name="Challenges"
				component={ChallengeStack}
				options={TABS.CHALLENGES}
			/>
			<Tab.Screen name="Goals" component={GoalsScreen} options={TABS.GOALS} />
		</Tab.Navigator>
	);
}
