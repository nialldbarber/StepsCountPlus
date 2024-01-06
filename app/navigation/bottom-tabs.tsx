import { Tabs } from "@/app/navigation/bottom-tabs/tabs";
import { ChallengeStack } from "@/app/navigation/challenges-stack";
import { Header } from "@/app/navigation/header";
import { ProfileStack } from "@/app/navigation/profile-stack";
import type { RootBottomTabsParamList } from "@/app/navigation/types";
import { GoalsScreen } from "@/app/screens/goals";
import { StatsScreen } from "@/app/screens/stats";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useStyles } from "react-native-unistyles";

const Tab = createBottomTabNavigator<RootBottomTabsParamList>();
type Focused = { focused: boolean };

function CustomTabBar(props: BottomTabBarProps) {
  return <Tabs {...props} />;
}

export function BottomTabs() {
  const { theme } = useStyles();

  const tabBarTintColors = {
    tabBarInactiveTintColor: theme.colors.bottomTabsTextColor,
    tabBarActiveTintColor: theme.colors.bottomTabsTextActiveColor,
  };

  const TABS = {
    STATS: {
      header: () => <Header header="stats" />,
    },
    CHALLENGES: {
      header: () => <Header header="challenges" />,
    },
    GOALS: {
      header: () => <Header header="goals" />,
    },
    PROFILE: {
      header: () => <Header header="profile" />,
    },
  };

  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      sceneContainerStyle={{
        backgroundColor: theme.colors.bottomTabsBackgroundColor,
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
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          ...TABS.PROFILE,
          ...tabBarTintColors,
        }}
      />
    </Tab.Navigator>
  );
}
