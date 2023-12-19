import { darkTheme, lightTheme } from "@/app/design-system/theme";
import { storage } from "@/app/storage/mmkv";
import { UnistylesRegistry } from "react-native-unistyles";

const currentTheme = storage.getString("theme");

UnistylesRegistry.addThemes({
	light: lightTheme,
	dark: darkTheme,
}).addConfig({
	initialTheme: currentTheme,
	adaptiveThemes: true,
});
