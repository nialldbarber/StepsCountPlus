jest.mock("react-native-unistyles", () => {
	const { lightTheme } = require("./app/design-system/theme");

	return {
		useStyles: () => ({
			styles: new Proxy({}, { get: () => () => {} }),
			theme: lightTheme,
			breakpoint: "md",
		}),
		createStyleSheet: jest.fn(() => ({})),
	};
});
