import { colors } from "@/app/design-system/colors";
import { ChallengeStack } from "@/app/navigation/challenges-stack";
import { Header } from "@/app/navigation/header";
import type { RootBottomTabsParamList } from "@/app/navigation/types";
import { GoalsScreen } from "@/app/screens/goals";
import { StatsScreen } from "@/app/screens/stats";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Award, Chart, StatusUp } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

const Tab = createBottomTabNavigator<RootBottomTabsParamList>();
type Focused = { focused: boolean };

export function BottomTabs() {
	const { theme } = useStyles();

	const tabBarTintColors = {
		tabBarInactiveTintColor: theme.colors.bottomTabsTextColor,
		tabBarActiveTintColor: theme.colors.bottomTabsTextActiveColor,
	};

	const TABS = {
		STATS: {
			tabBarIcon: ({ focused }: Focused) => (
				<Chart
					color={focused ? colors.primary : theme.colors.bottomTabsIconStroke}
				/>
			),
			header: () => <Header header="stats" />,
		},
		CHALLENGES: {
			tabBarIcon: ({ focused }: Focused) => (
				<StatusUp
					color={focused ? colors.primary : theme.colors.bottomTabsIconStroke}
				/>
			),
			header: () => <Header header="challenges" />,
		},
		GOALS: {
			tabBarIcon: ({ focused }: Focused) => (
				<Award
					color={focused ? colors.primary : theme.colors.bottomTabsIconStroke}
				/>
			),
			header: () => <Header header="goals" />,
		},
	};

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: theme.colors.bottomTabsBackgroundColor,
				},
			}}
		>
			<Tab.Screen
				name="Stats"
				component={StatsScreen}
				options={{
					...TABS.STATS,
					...tabBarTintColors,
				}}
			/>
			<Tab.Screen
				name="Challenges"
				component={ChallengeStack}
				options={{
					...TABS.CHALLENGES,
					...tabBarTintColors,
				}}
			/>
			<Tab.Screen
				name="Goals"
				component={GoalsScreen}
				options={{
					...TABS.GOALS,
					...tabBarTintColors,
				}}
			/>
		</Tab.Navigator>
	);
}
