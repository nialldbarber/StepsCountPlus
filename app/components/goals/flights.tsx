import { GoalsCard } from "@/app/components/goals/goals-card";
import { useGoalsStore } from "@/app/store/goals";
import { useMemo } from "react";

export function DailyFlightsGoal() {
	const { flightsGoal, setFlightsGoal } = useGoalsStore();

	const dailyDistanceOptions = [
		{ id: `daily-flights-${1}`, label: "5 flts", value: 5 },
		{ id: `daily-flights-${2}`, label: "10 flts", value: 10 },
		{ id: `daily-flights-${3}`, label: "20 flts", value: 20 },
		{ id: `daily-flights-${4}`, label: "30 flts", value: 30 },
	];

	const pluralisation = useMemo(() => {
		return flightsGoal === 1 ? " flight" : " flights";
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
