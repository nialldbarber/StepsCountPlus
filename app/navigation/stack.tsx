import { supabase } from "@/app/db";
import { useEffectOnce } from "@/app/hooks/useEffectOnce";
import { BottomTabs } from "@/app/navigation/bottom-tabs";
import { SettingsStack } from "@/app/navigation/settings-stack";
import type { RootStackParamsList } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { CreateAccountScreen } from "@/app/screens/create-account";
import { EnableHealthDataScreen } from "@/app/screens/enable-health-data";
import { EnableNotificationsScreen } from "@/app/screens/enable-notifications";
import { SignInScreen } from "@/app/screens/sign-in";
import { ThankYouScreen } from "@/app/screens/thank-you";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { useStyles } from "react-native-unistyles";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function StackNavigator() {
	const { theme } = useStyles();
	const [session, setSession] = useState<Session | null>(null);

	useEffectOnce(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	});

	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.screenBackgroundColor },
			}}
			initialRouteName={session?.user ? "Home" : "SignIn"}
		>
			{session?.user ? (
				// auth flow
				<>
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
				</>
			) : (
				// non-auth flow
				<>
					<Stack.Screen
						name="SignIn"
						component={SignInScreen}
						options={{ ...options }}
					/>
					<Stack.Screen
						name="CreateAccount"
						component={CreateAccountScreen}
						options={{ ...options }}
					/>
					<Stack.Screen
						name="ThankYou"
						component={ThankYouScreen}
						options={{ ...options }}
					/>
					<Stack.Screen
						name="EnableHealthData"
						component={EnableHealthDataScreen}
						options={{ ...options }}
					/>
					<Stack.Screen
						name="EnableNotifications"
						component={EnableNotificationsScreen}
						options={{ ...options }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
