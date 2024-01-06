jest.mock("react-native-unistyles", () => {
  const { lightTheme } = require("./app/design-system/design-tokens");

  return {
    useStyles: () => ({
      styles: new Proxy({}, { get: () => () => {} }),
      theme: lightTheme,
      breakpoint: "md",
    }),
    createStyleSheet: jest.fn(() => ({})),
  };
});

jest.mock("react-native-gesture-handler", () => {
  return {
    State: {},
    PanGestureHandler: "View",
    BaseButton: "View",
    Directions: {},
  };
});

jest.mock("@gorhom/bottom-sheet", () => {
  return {
    BottomSheetModal: "View",
    BottomSheetBackdrop: "View",
  };
});
