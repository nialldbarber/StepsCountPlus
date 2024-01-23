import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FlightsState = {
  dailyFlights: number;
  weeklyFlights: number;
  monthlyFlights: number;
  yearlyFlights: number;
};

type FlightsActions = {
  setDailyFlights: (flights: number) => void;
  setWeeklyFlights: (flights: number) => void;
  setMonthlyFlights: (flights: number) => void;
  setYearlyFlights: (flights: number) => void;
};

export const useFlightsStore = create(
  immer<FlightsState & FlightsActions>((set) => ({
    dailyFlights: 0,
    weeklyFlights: 0,
    monthlyFlights: 0,
    yearlyFlights: 0,
    setDailyFlights: (flights: number) =>
      set((state) => {
        state.dailyFlights = flights;
      }),
    setWeeklyFlights: (flights: number) =>
      set((state) => {
        state.weeklyFlights = flights;
      }),
    setMonthlyFlights: (flights: number) =>
      set((state) => {
        state.monthlyFlights = flights;
      }),
    setYearlyFlights: (flights: number) =>
      set((state) => {
        state.yearlyFlights = flights;
      }),
  }))
);
