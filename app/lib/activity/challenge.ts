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
    | AppleHealthKit["getDailyDistanceWalkingRunningSamples"]
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
        resolve(total);
      }
    });
  });
}

export function getPercentageFromPeriod(
  type: ChallengeType,
  startDate: string
) {
  const formattedStartDate = new Date(startDate).toISOString();
  const formattedEndDate = new Date().toISOString();
  const intervalDuration = INTERVAL_DURATIONS["24hours"];

  const options: HealthInputOptions = {
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    period: intervalDuration,
  };

  switch (type) {
    case "steps":
      return getCurrentPercentage(options, HealthKit.getDailyStepCountSamples);
    case "flights":
      return getCurrentPercentage(
        options,
        HealthKit.getDailyFlightsClimbedSamples
      );
    case "distance":
    case "f1-tracks":
    case "long-distance":
      return getCurrentPercentage(
        options,
        HealthKit.getDailyDistanceWalkingRunningSamples
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
    | AppleHealthKit["getDailyDistanceWalkingRunningSamples"]
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
  type: ChallengeType,
  startDate: string,
  intervalName: PeriodIntervals = "24hours"
) {
  const formattedStartDate = new Date(startDate).toISOString();
  const formattedEndDate = new Date().toISOString();
  const intervalDuration = INTERVAL_DURATIONS[intervalName];

  const options: HealthInputOptions = {
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    period: 1444,
  };

  switch (type) {
    case "steps":
      return getSegments(options, HealthKit.getDailyStepCountSamples);
    case "flights":
      return getSegments(options, HealthKit.getDailyFlightsClimbedSamples);
    case "distance":
    case "f1-tracks":
    case "long-distance":
      return getSegments(
        options,
        HealthKit.getDailyDistanceWalkingRunningSamples
      );
    default:
      return Promise.reject(new Error("Invalid challenge type"));
  }
}
