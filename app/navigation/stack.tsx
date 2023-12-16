import { BottomTabs } from "@/app/navigation/bottom-tabs";
import type { RootStackParamsList } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { SettingsScreen } from "@/app/screens/settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStyles } from "react-native-unistyles";

const Stack = createNativeStackNavigator<RootStackParamsList>();

// TODO: authentication here:

export function StackNavigator() {
	const { theme } = useStyles();

	return (
		<Stack.Navigator>
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
					component={SettingsScreen}
					options={{
						...options,
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
}
