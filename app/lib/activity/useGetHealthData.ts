import { useStepsStore } from "@/app/store/steps";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
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

	const { setDailySteps, setWeeklySteps, setMonthlySteps, setYearlySteps } =
		useStepsStore();

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
	}, [hasPermission]);
}
