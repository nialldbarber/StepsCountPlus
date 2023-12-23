import Config from "react-native-config";
import { LogLevel, OneSignal } from "react-native-onesignal";

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
