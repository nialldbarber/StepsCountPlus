import { RootNavigator } from "@/app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<RootNavigator />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
