import type { DaysPrevious } from "@/app/lib/activity/types";
import type { HealthInputOptions } from "react-native-health";
import AppleHealthKit from "react-native-health";

export function getStepsFromPeriod(
	daysPrevious: DaysPrevious,
	callback: (...args: unknown[]) => void,
) {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(endDate.getDate() - daysPrevious + 1);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 999);

	const options: HealthInputOptions = {
		startDate: startDate.toISOString(),
		endDate: new Date().toISOString(),
		period: 1444,
	};

	AppleHealthKit.getDailyStepCountSamples(options, (error, results) => {
		if (error) {
			console.error(
				`Error retrieving step count for the past ${daysPrevious}`,
				error,
			);
			callback(error, null);
			return;
		}

		if (!results || !Array.isArray(results)) {
			console.error("Results are undefined or _not_ an array", results);
			return;
		}

		const segments = results
			.map((segment) => ({
				timestamp: new Date().getTime(),
				value: segment?.value,
			}))
			.reverse();

		const totalSteps = results.reduce((total, current) => {
			if (!results) {
				console.error("An individual segment is undefined");
				return total;
			}
			return total + current?.value;
		}, 0);

		callback(null, Math.round(totalSteps), segments);
	});
}
