import type { Segments } from "@/app/store/measurement";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type StepsState = {
	dailySteps: number;
	weeklySteps: number;
	weeklySegments: Segments;
	monthlySteps: number;
	monthlySegments: Segments;
	yearlySteps: number;
	yearlySegments: Segments;
};

type StepsActions = {
	setDailySteps: (steps: number) => void;
	setWeeklySteps: (steps: number, segments: Segments) => void;
	setMonthlySteps: (steps: number, segments: Segments) => void;
	setYearlySteps: (steps: number, segments: Segments) => void;
};

export const useStepsStore = create(
	immer<StepsState & StepsActions>((set) => ({
		dailySteps: 0,
		weeklySteps: 0,
		weeklySegments: [],
		monthlySteps: 0,
		monthlySegments: [],
		yearlySteps: 0,
		yearlySegments: [],
		setDailySteps: (steps: number) =>
			set((state) => {
				state.dailySteps = steps;
			}),
		setWeeklySteps: (steps: number, segments: Segments) =>
			set((state) => {
				state.weeklySteps = steps;
				state.weeklySegments = segments;
			}),
		setMonthlySteps: (steps: number, segments: Segments) =>
			set((state) => {
				state.monthlySteps = steps;
				state.monthlySegments = segments;
			}),
		setYearlySteps: (steps: number, segments: Segments) =>
			set((state) => {
				state.yearlySteps = steps;
				state.yearlySegments = segments;
			}),
	})),
);
