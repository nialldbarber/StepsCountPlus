import type { Segments } from "@/app/store/measurement";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type DistanceState = {
	dailyDistance: number;
	weeklyDistance: number;
	weeklySegments: Segments;
	monthlyDistance: number;
	monthlySegments: Segments;
	yearlyDistance: number;
	yearlySegments: Segments;
};

type DistanceActions = {
	setDailyDistance: (distance: number) => void;
	setWeeklyDistance: (distance: number, segments: Segments) => void;
	setMonthlyDistance: (distance: number, segments: Segments) => void;
	setYearlyDistance: (distance: number, segments: Segments) => void;
};

export const useDistanceStore = create(
	immer<DistanceState & DistanceActions>((set) => ({
		dailyDistance: 0,
		weeklyDistance: 0,
		weeklySegments: [],
		monthlyDistance: 0,
		monthlySegments: [],
		yearlyDistance: 0,
		yearlySegments: [],
		setDailyDistance: (distance: number) =>
			set((state) => {
				state.dailyDistance = distance;
			}),
		setWeeklyDistance: (distance: number, segments: Segments) =>
			set((state) => {
				state.weeklyDistance = distance;
				state.weeklySegments = segments;
			}),
		setMonthlyDistance: (distance: number, segments: Segments) =>
			set((state) => {
				state.monthlyDistance = distance;
				state.monthlySegments = segments;
			}),
		setYearlyDistance: (distance: number, segments: Segments) =>
			set((state) => {
				state.yearlyDistance = distance;
				state.yearlySegments = segments;
			}),
	})),
);
