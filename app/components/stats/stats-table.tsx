import { Box } from "@/app/design-system/components/box";
import { Table } from "@/app/design-system/components/table";
import { Text } from "@/app/design-system/components/text";
import type { Goals } from "@/app/store/goal-types";
import { useMeasurementsStore } from "@/app/store/measurements";

type Props = {
	filter: Goals;
	daily: string | number;
	weekly: string | number;
	monthly: string | number;
	yearly: string | number;
};

export function StatsTable({ filter, daily, weekly, monthly, yearly }: Props) {
	const { distance } = useMeasurementsStore();

	return (
		<Table>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Today</Text>
				<Text>
					{daily} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Last 7 days</Text>
				<Text>
					{weekly} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Last month</Text>
				<Text>
					{monthly} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Last year</Text>
				<Text>
					{yearly} {filter === "Distance" && distance}
				</Text>
			</Box>
		</Table>
	);
}
