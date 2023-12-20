import { BottomTabs } from "@/app/navigation/bottom-tabs";
import { SettingsStack } from "@/app/navigation/settings-stack";
import type { RootStackParamsList } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStyles } from "react-native-unistyles";

const Stack = createNativeStackNavigator<RootStackParamsList>();

// TODO: authentication here:

export function StackNavigator() {
	const { theme } = useStyles();

	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.screenBackgroundColor },
			}}
		>
			<Stack.Group>
				<Stack.Screen
					name="Home"
					component={BottomTabs}
					options={{ headerShown: false }}
				/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="Settings"
					component={SettingsStack}
					options={{ ...options }}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
