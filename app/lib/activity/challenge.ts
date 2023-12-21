import type { HealthInputOptions } from "react-native-health";
import HealthKit from "react-native-health";

export function getMeasurementFromDate(
	type: "steps" | "flights" | "distance",
	startDate: string,
) {
	const formattedStartDate = new Date(startDate).toISOString();
	const formattedEndDate = new Date().toISOString();
	const options: HealthInputOptions = {
		startDate: formattedStartDate,
		endDate: formattedEndDate,
	};

	return new Promise((res, rej) => {
		if (type === "steps") {
			HealthKit.getDailyStepCountSamples(options, (error, results) => {
				if (error) {
					console.error("Error retrieving daily step count samples", error);
					rej(error);
				} else {
					const totalSteps = results.reduce(
						(sum, sample) => sum + sample.value,
						0,
					);
					res(totalSteps);
				}
			});
		} else if (type === "flights") {
			HealthKit.getDailyFlightsClimbedSamples(options, (error, results) => {
				if (error) {
					console.error("Error retrieving flights count for period", error);
					rej(error);
				} else {
					const totalSteps = results.reduce(
						(sum, sample) => sum + sample.value,
						0,
					);
					res(totalSteps);
				}
			});
		} else {
			HealthKit.getDailyDistanceWalkingRunningSamples(
				options,
				(error, results) => {
					if (error) {
						console.error("Error retrieving step count for period", error);
						rej(error);
					} else {
						const totalSteps = results.reduce(
							(sum, sample) => sum + sample.value,
							0,
						);
						res(totalSteps);
					}
				},
			);
		}
	});
}
