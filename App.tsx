import { RootNavigator } from "@/app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import React from "react";
import Config from "react-native-config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

Sentry.init({
	dsn: Config.SENTRY_DSN,
	tracesSampleRate: __DEV__ ? 1.0 : 0.5,
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
