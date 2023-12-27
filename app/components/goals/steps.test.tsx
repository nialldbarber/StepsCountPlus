import { renderWithNavigation } from "@/app/lib/tests";
import { screen } from "@testing-library/react-native";
import { DailyStepsGoal } from "./steps";

describe("DailyStepsGoal", () => {
	beforeEach(() => {
		renderWithNavigation(<DailyStepsGoal />);
	});

	test("renders the correct steps goal", () => {
		expect(screen.getByText("3,000")).toBeTruthy();
	});

	test("renders the correct options", () => {
		expect(screen.getByText("3,000")).toBeTruthy();
		expect(screen.getByText("4,000")).toBeTruthy();
		expect(screen.getByText("7,500")).toBeTruthy();
		expect(screen.getByText("10,000")).toBeTruthy();
	});
});
