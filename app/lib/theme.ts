import { storage } from "@/app/storage/mmkv";
import { UnistylesRuntime } from "react-native-unistyles";

export function invokeChangeTheme(
  theme: "light" | "dark" | "system",
  stylesRuntime: typeof UnistylesRuntime
) {
  storage.set("theme", theme);
  if (theme === "system") {
    stylesRuntime.setAdaptiveThemes(true);
  } else {
    stylesRuntime.setAdaptiveThemes(false);
    stylesRuntime.setTheme(theme);
  }
}
