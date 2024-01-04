import { zustandStorage } from "@/app/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GoalsState = {
  stepsGoal: number;
  setStepsGoal: (steps: number) => void;
  flightsGoal: number;
  setFlightsGoal: (flights: number) => void;
  distanceGoal: number;
  setDistanceGoal: (distance: number) => void;
};

export const useGoalsStore = create(
  persist<GoalsState>(
    (set, _) => ({
      stepsGoal: 5000,
      flightsGoal: 10,
      distanceGoal: 7,
      setStepsGoal: (steps) => {
        set({ stepsGoal: steps });
      },
      setDistanceGoal: (distance) => {
        set({ distanceGoal: distance });
      },
      setFlightsGoal: (flights) => {
        set({ flightsGoal: flights });
      },
    }),
    {
      name: "goals_state",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
