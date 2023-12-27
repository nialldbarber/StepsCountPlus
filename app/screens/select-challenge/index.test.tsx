import { renderWithNavigation } from "@/app/lib/tests";
import { screen } from "@testing-library/react-native";
import React from "react";
import { SelectChallengeScreen } from ".";

describe("Challenges", () => {
	test("challenges screen renders message", () => {
		renderWithNavigation(<SelectChallengeScreen />);
		const text = screen.getByText("Choose a category");
		expect(text).toBeTruthy();
	});
});
