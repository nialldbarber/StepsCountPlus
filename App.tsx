import { RootNavigator } from "@/app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://c10fd0e3f6024f0c865ec4351f8429fa@o429369.ingest.sentry.io/5375836',
});

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<RootNavigator />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
