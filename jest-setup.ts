/* eslint-disable import/no-extraneous-dependencies */

import "@testing-library/react-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
