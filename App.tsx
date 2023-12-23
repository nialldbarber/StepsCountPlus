import { RootNavigator } from "@/app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import React from "react";
import Config from "react-native-config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogLevel, OneSignal } from "react-native-onesignal";
import Toast from "react-native-toast-message";

Sentry.init({
	dsn: Config.SENTRY_DSN,
	tracesSampleRate: __DEV__ ? 1.0 : 0.5,
});

// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize(Config.ONE_SIGNAL_INIT as string);

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener("click", (event) => {
	console.log("OneSignal: notification clicked:", event);
});

function App() {
	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<RootNavigator />
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
			<Toast />
		</>
	);
}

export default Sentry.wrap(App);
