import { GoalsCard } from "@/app/components/goals/goals-card";
import { useGoalsStore } from "@/app/store/goals";
import { useMemo } from "react";

export function DailyFlightsGoal() {
	const { flightsGoal, setFlightsGoal } = useGoalsStore();

	const dailyDistanceOptions = [
		{ id: `daily-flights-${1}`, label: "5 flrs", value: 5 },
		{ id: `daily-flights-${2}`, label: "10 flrs", value: 10 },
		{ id: `daily-flights-${3}`, label: "20 flrs", value: 20 },
		{ id: `daily-flights-${4}`, label: "30 flrs", value: 30 },
	];

	const pluralisation = useMemo(() => {
		return flightsGoal === 1 ? " floor" : " floors";
	}, [flightsGoal]);

	return (
		<GoalsCard
			title="Flights"
			goalAmount={flightsGoal}
			units={pluralisation}
			incrementBy="1"
			decrementBy="1"
			lowerLimit={1}
			upperLimit={500}
			goalCallback={setFlightsGoal}
			options={dailyDistanceOptions}
		/>
	);
}
