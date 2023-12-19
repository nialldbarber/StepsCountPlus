import { Box } from "@/app/design-system/components/box";
import { Table } from "@/app/design-system/components/table";
import { Text } from "@/app/design-system/components/text";
import { useMeasurementsStore } from "@/app/store/measurements";

type Props = {
	filter: "Steps" | "Flights" | "Distance";
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
				<Text>Daily </Text>
				<Text>
					{daily} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Weekly </Text>
				<Text>
					{weekly} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Monthly </Text>
				<Text>
					{monthly} {filter === "Distance" && distance}
				</Text>
			</Box>
			<Box flexDirection="row" justifyContent="space-between">
				<Text>Yearly </Text>
				<Text>
					{yearly} {filter === "Distance" && distance}
				</Text>
			</Box>
		</Table>
	);
}
