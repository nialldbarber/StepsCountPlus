import { renderWithNavigation } from "@/app/lib/tests";
import { screen } from "@testing-library/react-native";
import { SelectChallengeScreen } from "../select-challenge";

describe("Challenges", () => {
	test("renders 'Looks like you haven't started a challenge!' message when there is no active challenge", () => {
		renderWithNavigation(<SelectChallengeScreen />);
		const message = screen.getByText(
			"Looks like you haven't started a challenge!",
		);
		expect(message).toBeTruthy();
	});

	test.skip("renders emoji when there is no active challenge", () => {
		renderWithNavigation(<SelectChallengeScreen />);
		const emoji = screen.getByText("🙈");
		expect(emoji).toBeTruthy();
	});
});
