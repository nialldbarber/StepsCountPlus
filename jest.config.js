module.exports = {
	preset: "@testing-library/react-native",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	setupFilesAfterEnv: ["./jest-setup.ts"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation/.*|react-native-svg|react-native-unistyles)/)",
	],
};

/**

Has anyone used this library with Jest? I might be exposing my lack of knowledge of setting up Jest with 3rd party libraries, but I keep getting this message during testing. Unistyles works fine during development, as I followed the setup in the docs. 

If it's useful, this is my `jest.config.js`

module.exports = {
	preset: "@testing-library/react-native",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	setupFilesAfterEnv: ["./jest-setup.ts"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-navigation|@react-navigation/.*|react-native-svg|react-native-unistyles)/)",
	],
};

 */
