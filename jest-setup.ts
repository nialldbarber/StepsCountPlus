/* eslint-disable import/no-extraneous-dependencies */

import "@testing-library/react-native/extend-expect";
import { NativeModules } from "react-native";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

NativeModules.Unistyles = {
	install: jest.fn().mockReturnValue(true),
	useStyles: {
		styles: jest.fn(),
	},
};

global.__UNISTYLES__ = {
	enabledPlugins: [],
	useBreakpoints: jest.fn(),
	useAdaptiveThemes: jest.fn(),
	useTheme: jest.fn(),
	themeName: "darkTheme",
};
