import { darkTheme, lightTheme } from "@/app/design-system/theme";
import { UnistylesRegistry } from "react-native-unistyles";

UnistylesRegistry.addThemes({
	light: lightTheme,
	dark: darkTheme,
}).addConfig({
	adaptiveThemes: true,
});
