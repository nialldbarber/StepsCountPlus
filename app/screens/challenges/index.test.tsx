import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ChallengesScreen } from ".";

jest.mock("@react-navigation/native", () => {
	const actualNav = jest.requireActual("@react-navigation/native");
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: jest.fn(),
			dispatch: jest.fn(),
		}),
	};
});

describe("Challenges", () => {
	test("challenges screen renders message", () => {
		render(<ChallengesScreen />);
		const text = screen.getByText("My challenges");
		expect(text).toBeTruthy();
	});
});
