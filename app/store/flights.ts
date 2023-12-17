import type { Segments } from "@/app/store/measurement";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FlightsState = {
	dailyFlights: number;
	weeklyFlights: number;
	weeklySegments: Segments;
	monthlyFlights: number;
	monthlySegments: Segments;
	yearlyFlights: number;
	yearlySegments: Segments;
};

type FlightsActions = {
	setDailyFlights: (flights: number) => void;
	setWeeklyFlights: (flights: number, segments: Segments) => void;
	setMonthlyFlights: (flights: number, segments: Segments) => void;
	setYearlyFlights: (flights: number, segments: Segments) => void;
};

export const useFlightsStore = create(
	immer<FlightsState & FlightsActions>((set) => ({
		dailyFlights: 0,
		weeklyFlights: 0,
		weeklySegments: [],
		monthlyFlights: 0,
		monthlySegments: [],
		yearlyFlights: 0,
		yearlySegments: [],
		setDailyFlights: (flights: number) =>
			set((state) => {
				state.dailyFlights = flights;
			}),
		setWeeklyFlights: (flights: number, segments: Segments) =>
			set((state) => {
				state.weeklyFlights = flights;
				state.weeklySegments = segments;
			}),
		setMonthlyFlights: (flights: number, segments: Segments) =>
			set((state) => {
				state.monthlyFlights = flights;
				state.monthlySegments = segments;
			}),
		setYearlyFlights: (flights: number, segments: Segments) =>
			set((state) => {
				state.yearlyFlights = flights;
				state.yearlySegments = segments;
			}),
	})),
);
