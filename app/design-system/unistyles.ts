import { darkTheme, lightTheme } from "@/app/design-system/design-tokens";
import { storage } from "@/app/storage/mmkv";
import { UnistylesRegistry, UnistylesThemes } from "react-native-unistyles";

const currentTheme = storage.getString("theme") as keyof UnistylesThemes;

UnistylesRegistry.addThemes({
	light: lightTheme,
	dark: darkTheme,
}).addConfig({
	initialTheme: currentTheme,
	adaptiveThemes: false,
});
