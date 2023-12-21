import { getMeasurementsFromPeriod } from "@/app/lib/activity/steps";
import { useDistanceStore } from "@/app/store/distance";
import { useFlightsStore } from "@/app/store/flights";
import { useMeasurementsStore } from "@/app/store/measurements";
import { useStepsStore } from "@/app/store/steps";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import type {
	HealthInputOptions,
	HealthKitPermissions,
	HealthValue,
} from "react-native-health";
import AppleHealthKit from "react-native-health";
import { convertKmToMiles } from "../format/measurements";

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
	const [isLoading, setIsLoading] = useState(true);
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
	 * @type Initialisaton
	 * =====================================================================
	 */
	useEffect(() => {
		if (Platform.OS !== "ios") return;

		AppleHealthKit.isAvailable((error, isAvailable) => {
			if (error) {
				console.error("Error checking availability", error);
				return;
			}
			if (!isAvailable) {
				console.error("Apple Health not available");
				return;
			}

			AppleHealthKit.initHealthKit(permissions, (initError) => {
				if (initError) {
					console.error("Error getting permissions", initError);
					return;
				}
				setHasPermission(true);
			});
		});
	}, []);

	useEffect(() => {
		if (!hasPermission) {
			console.error("Do not have permission to access health data");
			return;
		}

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
						if (error) return;
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
					(error, totalSteps, segments) => {
						if (error) return;
						setWeeklySteps(totalSteps, segments);
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
					(error, totalSteps, segments) => {
						if (error) return;
						setMonthlySteps(totalSteps, segments);
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
					(error, totalSteps, segments) => {
						if (error) {
							console.error("Error getting yearly steps", error);
							return;
						}
						setYearlySteps(totalSteps, segments);
					},
				);
			} catch (error) {
				console.error("Failed to invoke steps data");
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
						if (error) return;
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
					(error, totalFlights, segments) => {
						if (error) return;
						setWeeklyFlights(totalFlights, segments);
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
					(error, totalFlights, segments) => {
						if (error) return;
						setMonthlyFlights(totalFlights, segments);
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
					(error, totalFlights, segments) => {
						if (error) return;
						setYearlyFlights(totalFlights, segments);
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
						if (error) return;
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
					(error, totalDistance, segments) => {
						if (error) return;
						setWeeklyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
							segments,
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
					(error, totalDistance, segments) => {
						if (error) return;
						setMonthlyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
							segments,
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
					(error, totalDistance, segments) => {
						if (error) return;
						setYearlyDistance(
							distance === "km"
								? totalDistance
								: convertKmToMiles(totalDistance),
							segments,
						);
					},
				);
			} catch (error) {
				console.error("Failed to invoke distance data");
			}
		}

		invokeStepsData();
		invokeFlightsData();
		invokeDistanceData();
	}, [hasPermission, distance]);

	return { isLoading };
}
