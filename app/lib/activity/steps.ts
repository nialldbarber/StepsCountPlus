import type { DaysPrevious } from "@/app/lib/activity/types";
import type {
  HealthInputOptions,
  AppleHealthKit as HealthKit,
} from "react-native-health";

export function getMeasurementsFromPeriod(
  daysPrevious: DaysPrevious,
  retrievalFn:
    | HealthKit["getDailyStepCountSamples"]
    | HealthKit["getDailyFlightsClimbedSamples"]
    | HealthKit["getDailyDistanceWalkingRunningSamples"],
  // biome-ignore lint/suspicious/noExplicitAny: @TODO: find explicit type
  callback: (...args: any[]) => void
) {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(endDate.getDate() - daysPrevious + 1);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const options: HealthInputOptions = {
    startDate: startDate.toISOString(),
    endDate: new Date().toISOString(),
  };

  retrievalFn(options, (error, results) => {
    if (error) {
      console.error(
        `Error retrieving step count for the past ${daysPrevious}`,
        error
      );
      callback(error, null);
      return;
    }

    if (!Array.isArray(results)) {
      console.error("Results are undefined or _not_ an array", results);
      return;
    }

    const totalSteps = results.reduce((total, { value }) => total + value, 0);
    callback(null, Math.round(totalSteps));
  });
}
