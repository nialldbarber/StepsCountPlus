import { storage } from "@/app/storage/mmkv";
import { UnistylesRuntime } from "react-native-unistyles";

export function invokeChangeTheme(
  theme: "light" | "dark",
  stylesRuntime: typeof UnistylesRuntime
) {
  storage.set("theme", theme);
  stylesRuntime.setAdaptiveThemes(false);
  stylesRuntime.setTheme(theme);
}
