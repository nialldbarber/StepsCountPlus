import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type StepsState = {
  dailySteps: number;
  weeklySteps: number;
  monthlySteps: number;
  yearlySteps: number;
};

type StepsActions = {
  setDailySteps: (steps: number) => void;
  setWeeklySteps: (steps: number) => void;
  setMonthlySteps: (steps: number) => void;
  setYearlySteps: (steps: number) => void;
};

export const useStepsStore = create(
  immer<StepsState & StepsActions>((set) => ({
    dailySteps: 0,
    weeklySteps: 0,
    monthlySteps: 0,
    yearlySteps: 0,
    setDailySteps: (steps: number) =>
      set((state) => {
        state.dailySteps = steps;
      }),
    setWeeklySteps: (steps: number) =>
      set((state) => {
        state.weeklySteps = steps;
      }),
    setMonthlySteps: (steps: number) =>
      set((state) => {
        state.monthlySteps = steps;
      }),
    setYearlySteps: (steps: number) =>
      set((state) => {
        state.yearlySteps = steps;
      }),
  }))
);
