import { getMeasurementsFromPeriod } from "@/app/lib/activity/steps";
import { convertKmToMiles } from "@/app/lib/format/measurements";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useStepsStore } from "@/app/store/steps";
import { useEffect, useState } from "react";
import type {
	HealthInputOptions,
	HealthKitPermissions,
	HealthValue,
} from "react-native-health";
import AppleHealthKit from "react-native-health";

const { Permissions } = AppleHealthKit.Constants;
const permissions = {
	permissions: {
		read: [
			Permissions.Steps,
			Permissions.StepCount,
			Permissions.FlightsClimbed,
			Permissions.DistanceWalkingRunning,
		],
		write: [],
	},
} as HealthKitPermissions;

export function useGetHealthData(date: Date) {
	const [hasPermission, setHasPermission] = useState(false);

	const { distance } = useMeasurementsStore();
	const { setDailySteps, setWeeklySteps, setMonthlySteps, setYearlySteps } =
		useStepsStore();
	const {
		setDailyFlights,
		setWeeklyFlights,
		setMonthlyFlights,
		setYearlyFlights,
	} = useFlightsStore();
	const {
		setDailyDistance,
		setWeeklyDistance,
		setMonthlyDistance,
		setYearlyDistance,
	} = useDistanceStore();

	/**
	 * =====================================================================
	 * @type Initialisaton // Check if Apple Health permissions are granted
	 * =====================================================================
	 */
	useEffect(() => {
		AppleHealthKit.initHealthKit(permissions, (initError) => {
			if (initError) {
				console.error("Error getting permissions", initError);
				setHasPermission(false);
			} else {
				setHasPermission(true);
			}
		});

		async function invokeStepsData() {
			try {
				/**
				 * =====================================================================
				 * @type Steps
				 * @period Daily
				 * =====================================================================
				 */
				const dailyStepsOptions: HealthInputOptions = {
					date: date.toISOString(),
					includeManuallyAdded: false,
				};
				AppleHealthKit.getStepCount(
					dailyStepsOptions,
					(error, results: HealthValue) => {
						if (error) {
							console.error("Error getting daily steps", error);
							return;
						}
						setDailySteps(results.value);
					},
				);

				/**
				 * =====================================================================
				 * @type Steps
				 * @period Weekly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					7,
					AppleHealthKit.getDailyStepCountSamples,
					(error, totalSteps) => {
						if (error) return;
						setWeeklySteps(totalSteps);
					},
				);

				/**
				 * =====================================================================
				 * @type Steps
				 * @period Monthly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					30,
					AppleHealthKit.getDailyStepCountSamples,
					(error, totalSteps) => {
						if (error) return;
						setMonthlySteps(totalSteps);
					},
				);

				/**
				 * =====================================================================
				 * @type Steps
				 * @period Yearly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					365,
					AppleHealthKit.getDailyStepCountSamples,
					(error, totalSteps) => {
						if (error) {
							console.error("Error getting yearly steps", error);
							return;
						}
						setYearlySteps(totalSteps);
					},
				);
			} catch (error) {
				console.error("Failed to invoke steps data", error);
			}
		}

		async function invokeFlightsData() {
			try {
				/**
				 * =====================================================================
				 * @type Flights
				 * @period Daily
				 * =====================================================================
				 */
				const dailyFlightsOptions: HealthInputOptions = {
					date: date.toISOString(),
					includeManuallyAdded: false,
				};
				AppleHealthKit.getFlightsClimbed(
					dailyFlightsOptions,
					(error, results: HealthValue) => {
						if (error) {
							console.error("Error getting daily flights", error);
							return;
						}
						setDailyFlights(results.value);
					},
				);

				/**
				 * =====================================================================
				 * @type Flights
				 * @period Weekly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					7,
					AppleHealthKit.getDailyFlightsClimbedSamples,
					(error, totalFlights) => {
						if (error) return;
						setWeeklyFlights(totalFlights);
					},
				);

				/**
				 * =====================================================================
				 * @type Flights
				 * @period Monthly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					30,
					AppleHealthKit.getDailyFlightsClimbedSamples,
					(error, totalFlights) => {
						if (error) return;
						setMonthlyFlights(totalFlights);
					},
				);

				/**
				 * =====================================================================
				 * @type Flights
				 * @period Yearly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					365,
					AppleHealthKit.getDailyFlightsClimbedSamples,
					(error, totalFlights) => {
						if (error) return;
						setYearlyFlights(totalFlights);
					},
				);
			} catch (error) {
				console.error("Failed to invoke flights data");
			}
		}

		async function invokeDistanceData() {
			try {
				/**
				 * =====================================================================
				 * @type Distance
				 * @period Daily
				 * =====================================================================
				 */
				const dailyDistanceOptions: HealthInputOptions = {
					date: date.toISOString(),
					includeManuallyAdded: false,
				};
				AppleHealthKit.getDistanceWalkingRunning(
					dailyDistanceOptions,
					(error, results: HealthValue) => {
						if (error) {
							console.error("Error getting daily distance", error);
							return;
						}
						setDailyDistance(
							distance === "km"
								? results.value
								: convertKmToMiles(results.value),
						);
					},
				);

				/**
				 * =====================================================================
				 * @type Distance
				 * @period Weekly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					7,
					AppleHealthKit.getDailyDistanceWalkingRunningSamples,
					(error, totalDistance) => {
						if (error) return;
						setWeeklyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
						);
					},
				);

				/**
				 * =====================================================================
				 * @type Distance
				 * @period Monthly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					30,
					AppleHealthKit.getDailyDistanceWalkingRunningSamples,
					(error, totalDistance) => {
						if (error) return;
						setMonthlyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
						);
					},
				);

				/**
				 * =====================================================================
				 * @type Distance
				 * @period Yearly
				 * =====================================================================
				 */
				getMeasurementsFromPeriod(
					365,
					AppleHealthKit.getDailyDistanceWalkingRunningSamples,
					(error, totalDistance) => {
						if (error) return;
						setYearlyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
						);
					},
				);
			} catch (error) {
				console.error("Failed to invoke distance data");
			}
		}

		try {
			if (hasPermission) {
				invokeStepsData();
				invokeFlightsData();
				invokeDistanceData();
			}
		} catch (error) {
			// @TODO: set global error here directing
			// the user to accept health permissions in settings
			console.error(error);
		}
	}, [hasPermission, distance]);
}
