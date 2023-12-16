import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ChallengesScreen } from ".";

describe("Challenges", () => {
	test("challenges screen renders message", () => {
		render(<ChallengesScreen />);
		const text = screen.getByText("Hello from Challenges!");
		expect(text).toBeTruthy();
	});
});
