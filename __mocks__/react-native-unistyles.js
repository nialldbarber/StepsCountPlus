// __mocks__/react-native-unistyles.js

// Mock implementations or placeholders for the exported functions and objects
const mq = jest.fn();
const useStyles = jest.fn();
const useInitialTheme = jest.fn();
const createStyleSheet = jest.fn();
const ScreenOrientation = {}; // Mock this based on how it's used in your app

const UnistylesRegistry = {
	addThemes: jest.fn(),
	addBreakpoints: jest.fn(),
	addConfig: jest.fn(),
};

const UnistylesRuntime = {}; // Mock this based on how it's used in your app

// Export the mocked versions
module.exports = {
	mq,
	useStyles,
	useInitialTheme,
	createStyleSheet,
	ScreenOrientation,
	UnistylesRegistry,
	UnistylesRuntime,
};
