import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type DistanceState = {
  dailyDistance: number;
  weeklyDistance: number;
  monthlyDistance: number;
  yearlyDistance: number;
};

type DistanceActions = {
  setDailyDistance: (distance: number) => void;
  setWeeklyDistance: (distance: number) => void;
  setMonthlyDistance: (distance: number) => void;
  setYearlyDistance: (distance: number) => void;
};

export const useDistanceStore = create(
  immer<DistanceState & DistanceActions>((set) => ({
    dailyDistance: 0,
    weeklyDistance: 0,
    monthlyDistance: 0,
    yearlyDistance: 0,
    setDailyDistance: (distance: number) =>
      set((state) => {
        state.dailyDistance = distance;
      }),
    setWeeklyDistance: (distance: number) =>
      set((state) => {
        state.weeklyDistance = distance;
      }),
    setMonthlyDistance: (distance: number) =>
      set((state) => {
        state.monthlyDistance = distance;
      }),
    setYearlyDistance: (distance: number) =>
      set((state) => {
        state.yearlyDistance = distance;
      }),
  }))
);
