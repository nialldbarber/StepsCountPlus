import { ChallengeType } from "@/app/store/challenges";
import type { AppleHealthKit, HealthInputOptions } from "react-native-health";
import HealthKit from "react-native-health";

const INTERVAL_DURATIONS = {
	"24hours": 24 * 60 * 60 * 1000,
	"1week": 7 * 24 * 60 * 60 * 1000,
	"1month": 30 * 24 * 60 * 60 * 1000,
	"1year": 365 * 24 * 60 * 60 * 1000,
};
export type PeriodIntervals = keyof typeof INTERVAL_DURATIONS;

function getHealthData(
	options: HealthInputOptions,
	fn:
		| AppleHealthKit["getDailyStepCountSamples"]
		| AppleHealthKit["getDailyFlightsClimbedSamples"]
		| AppleHealthKit["getDailyDistanceWalkingRunningSamples"],
	useSegments: boolean,
) {
	return new Promise((res, rej) => {
		fn(options, (error, results) => {
			if (error) {
				console.error("Error retrieving data", error);
				rej(error);
			} else {
				if (useSegments) {
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

					res([totalSteps, segments]);
				} else {
					const totalSteps = results.reduce(
						(sum, sample) => sum + sample.value,
						0,
					);
					res(totalSteps);
				}
			}
		});
	});
}

export function getMeasurementFromDate(
	type: ChallengeType,
	startDate: string,
	useSegments?: boolean,
	intervalName?: PeriodIntervals = "24hours",
) {
	const formattedStartDate = new Date(startDate).toISOString();
	const formattedEndDate = new Date().toISOString();
	const intervalDuration = INTERVAL_DURATIONS[intervalName];

	const options = {
		startDate: formattedStartDate,
		endDate: formattedEndDate,
		period: intervalDuration,
	};

	console.log("I AM BEING CALLED");

	switch (type) {
		case "steps":
			return getHealthData(
				options,
				HealthKit.getDailyStepCountSamples,
				useSegments,
			);
		case "flights":
			return getHealthData(
				options,
				HealthKit.getDailyFlightsClimbedSamples,
				useSegments,
			);
		case "distance":
		case "f1-tracks":
		case "long-distance":
			return getHealthData(
				options,
				HealthKit.getDailyDistanceWalkingRunningSamples,
				useSegments,
			);
		default:
			return Promise.reject(new Error("Invalid challenge type"));
	}
}
