import type { RootSettingsScreen } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { GiveFeedbackScreen } from "@/app/screens/give-feedback";
import { PrivacyPolicyScreen } from "@/app/screens/privacy-policy";
import { RateAppScreen } from "@/app/screens/rate-app";
import { SettingsScreen } from "@/app/screens/settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStyles } from "react-native-unistyles";

const Stack = createNativeStackNavigator<RootSettingsScreen>();

export function SettingsStack() {
	const { theme } = useStyles();

	return (
		<Stack.Navigator
			initialRouteName="SettingsRoot"
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.screenBackgroundColor },
			}}
		>
			<Stack.Screen
				name="SettingsRoot"
				component={SettingsScreen}
				options={options}
			/>
			<Stack.Screen
				name="PrivacyPolicy"
				component={PrivacyPolicyScreen}
				options={options}
			/>
			<Stack.Screen
				name="GiveFeedback"
				component={GiveFeedbackScreen}
				options={options}
			/>
			<Stack.Screen
				name="RateApp"
				component={RateAppScreen}
				options={options}
			/>
		</Stack.Navigator>
	);
}
