import { RootNavigator } from "@/app/navigation";
import "@/app/services/one-signal";
import "@/app/services/sentry";
import { storage } from "@/app/storage/mmkv";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

if (!storage.getString("theme")) {
  storage.set("theme", "light");
}

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
