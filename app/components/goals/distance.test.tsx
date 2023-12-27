import { renderWithNavigation } from "@/app/lib/tests";
import { screen } from "@testing-library/react-native";
import { DailyDistanceGoal } from "./distance";

describe("DailyDistanceGoal", () => {
	beforeEach(() => {
		renderWithNavigation(<DailyDistanceGoal />);
	});

	test("renders the GoalsCard component", () => {
		expect(screen.getByText(/Distance 📍/i)).toBeTruthy();
	});

	test("renders the correct distance goal", () => {
		expect(screen.getByText("5 km")).toBeTruthy();
	});

	test("renders the correct units", () => {
		expect(screen.getByText("km")).toBeTruthy();
	});

	test.only("renders the correct options", () => {
		expect(screen.getByText("5 km")).toBeTruthy();
		expect(screen.getByText("7 km")).toBeTruthy();
		expect(screen.getByText("10 km")).toBeTruthy();
		expect(screen.getByText("15 km")).toBeTruthy();
	});
});
