import { ChallengeType } from "@/app/store/challenges";
import type { AppleHealthKit, HealthInputOptions } from "react-native-health";
import HealthKit from "react-native-health";
import { determinePercentage } from "../format/numbers";

const INTERVAL_DURATIONS = {
	"24hours": 24 * 60 * 60 * 1000,
	"1week": 7 * 24 * 60 * 60 * 1000,
	"1month": 30 * 24 * 60 * 60 * 1000,
	"1year": 365 * 24 * 60 * 60 * 1000,
};
export type PeriodIntervals = keyof typeof INTERVAL_DURATIONS;

/**
 * =============================================================================
 * Determine percentage
 * =============================================================================
 */
export function getCurrentPercentage(
	options: HealthInputOptions,
	fn:
		| AppleHealthKit["getDailyStepCountSamples"]
		| AppleHealthKit["getDailyFlightsClimbedSamples"]
		| AppleHealthKit["getDailyDistanceWalkingRunningSamples"],
	target: number,
) {
	return new Promise((resolve, reject) => {
		fn(options, (error, results) => {
			if (error) {
				console.error("Error retrieving data", error);
				reject(error);
			} else {
				if (!results || !Array.isArray(results)) {
					console.error("Results are undefined or _not_ an array", results);
					return;
				}
				const total = results.reduce((sum, sample) => sum + sample.value, 0);
				const percentage = determinePercentage(total, target);
				resolve(percentage);
			}
		});
	});
}

export function getPercentageFromPeriod(
	category: ChallengeType,
	startDate: string,
	target: number,
) {
	const formattedStartDate = new Date(startDate).toISOString();
	const formattedEndDate = new Date().toISOString();
	const intervalDuration = INTERVAL_DURATIONS["24hours"];

	const options: HealthInputOptions = {
		startDate: formattedStartDate,
		endDate: formattedEndDate,
		period: intervalDuration,
	};

	switch (category) {
		case "steps":
			return getCurrentPercentage(
				options,
				HealthKit.getDailyStepCountSamples,
				target,
			);
		case "flights":
			return getCurrentPercentage(
				options,
				HealthKit.getDailyFlightsClimbedSamples,
				target,
			);
		case "distance":
		case "f1-tracks":
		case "long-distance":
		case "cycling":
		case "custom":
			return getCurrentPercentage(
				options,
				HealthKit.getDailyDistanceWalkingRunningSamples,
				target,
			);
		default:
			return Promise.reject(new Error("Invalid challenge type"));
	}
}

/**
 * =============================================================================
 * Collect segments
 * =============================================================================
 */
export function getSegments(
	options: HealthInputOptions,
	fn:
		| AppleHealthKit["getDailyStepCountSamples"]
		| AppleHealthKit["getDailyFlightsClimbedSamples"]
		| AppleHealthKit["getDailyDistanceWalkingRunningSamples"],
) {
	return new Promise((resolve, reject) => {
		fn(options, (error, results) => {
			if (error) {
				console.error("Error retrieving data", error);
				reject(error);
			} else {
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

				resolve(segments);
			}
		});
	});
}

export function getSegmentsFromPeriod(
	category: ChallengeType,
	startDate: string,
) {
	const formattedStartDate = new Date(startDate).toISOString();
	const formattedEndDate = new Date().toISOString();

	const options: HealthInputOptions = {
		startDate: formattedStartDate,
		endDate: formattedEndDate,
		period: 1444,
	};

	switch (category) {
		case "steps":
			return getSegments(options, HealthKit.getDailyStepCountSamples);
		case "flights":
			return getSegments(options, HealthKit.getDailyFlightsClimbedSamples);
		case "distance":
		case "f1-tracks":
		case "long-distance":
		case "cycling":
		case "custom":
			return getSegments(
				options,
				HealthKit.getDailyDistanceWalkingRunningSamples,
			);
		default:
			return Promise.reject(new Error("Invalid challenge type"));
	}
}
