module.exports = {
	preset: "@testing-library/react-native",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	setupFilesAfterEnv: ["./jest-setup.ts", "./jest-global-mocks.js"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation/.*|react-native-svg|react-native-reanimated|react-native-haptic-feedback|react-native-unistyles)/)",
	],
};
