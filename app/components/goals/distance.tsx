import { GoalsCard } from "@/app/components/goals/goals-card";
import { useGoalsStore } from "@/app/store/goals";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useMemo } from "react";

export function DailyDistanceGoal() {
	const { distanceGoal, setDistanceGoal } = useGoalsStore();
	const { distance } = useMeasurementsStore();

	const getDistance = distance === "km" ? "km" : "mls";

	const dailyDistanceOptions = [
		{ id: `daily-distance-${1}`, label: `5 ${getDistance}`, value: 5 },
		{ id: `daily-distance-${2}`, label: `7 ${getDistance}`, value: 7 },
		{ id: `daily-distance-${3}`, label: `10 ${getDistance}`, value: 10 },
		{ id: `daily-distance-${4}`, label: `15 ${getDistance}`, value: 15 },
	];

	const pluralisation = useMemo(() => {
		if (distance === "miles" && distanceGoal === 1) {
			return "mile";
		}

		return distance;
	}, [distance, distanceGoal]);

	return (
		<GoalsCard
			type="Distance"
			title="Distance 📍"
			goalAmount={distanceGoal}
			units={pluralisation}
			incrementBy="0.5"
			decrementBy="0.5"
			lowerLimit={0.5}
			upperLimit={300}
			goalCallback={setDistanceGoal}
			options={dailyDistanceOptions}
		/>
	);
}
