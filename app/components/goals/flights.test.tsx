import { renderWithNavigation } from "@/app/lib/tests";
import { screen } from "@testing-library/react-native";
import { DailyFlightsGoal } from "./flights";

describe("DailyFlightsGoal", () => {
	beforeEach(() => {
		renderWithNavigation(<DailyFlightsGoal />);
	});

	test("renders the GoalsCard component", () => {
		expect(screen.getByText(/Flights 🪜/i)).toBeTruthy();
	});

	test("renders the correct flights goal", () => {
		expect(screen.getByText("5 flts")).toBeTruthy();
	});

	test("renders the correct units", () => {
		expect(screen.getByText("flts")).toBeTruthy();
	});

	test.only("renders the correct options", () => {
		expect(screen.getByText("5 flts")).toBeTruthy();
		expect(screen.getByText("10 flts")).toBeTruthy();
		expect(screen.getByText("20 flts")).toBeTruthy();
		expect(screen.getByText("30 flts")).toBeTruthy();
	});
});
