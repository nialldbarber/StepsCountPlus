import { GoalsCard } from "@/app/components/goals/goals-card";
import { useGoalsStore } from "@/app/store/goals";

const dailyStepsOptions = [
	{ id: `daily-step-${1}`, label: "3,000", value: 3000 },
	{ id: `daily-step-${2}`, label: "4,000", value: 4000 },
	{ id: `daily-step-${3}`, label: "7,500", value: 7500 },
	{ id: `daily-step-${4}`, label: "10,000", value: 10000 },
];

export function DailyStepsGoal() {
	const { stepsGoal, setStepsGoal } = useGoalsStore();

	return (
		<GoalsCard
			type="Steps"
			title="Steps 👟"
			goalAmount={stepsGoal}
			incrementBy="100"
			decrementBy="100"
			lowerLimit={500}
			upperLimit={40000}
			goalCallback={setStepsGoal}
			options={dailyStepsOptions}
		/>
	);
}
