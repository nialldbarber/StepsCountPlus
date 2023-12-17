import { zustandStorage } from "@/app/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Measurements = "km" | "miles";

type MeasurementsState = {
	distance: Measurements;
	setDistance: (distance: Measurements) => void;
};

export const useMeasurementsStore = create(
	persist<MeasurementsState>(
		(set, get) => ({
			distance: "km",
			setDistance: (distance: Measurements) => {
				set({ distance });
			},
		}),
		{
			name: "measurements_state",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
