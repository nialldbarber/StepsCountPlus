import { getMeasurementsFromPeriod } from "@/app/lib/activity/steps";
import { useStepsStore } from "@/app/store/steps";
import { useEffect } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import type { HealthInputOptions, HealthValue } from "react-native-health";
import AppleHealthKit from "react-native-health";

export function useGetStepsData(date: Date) {
	const { setDailySteps, setWeeklySteps, setMonthlySteps, setYearlySteps } =
		useStepsStore();

	useEffect(() => {
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

		invokeStepsData();

		/**
		 * =====================================================================
		 * @type Steps
		 * =====================================================================
		 */
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:StepCount:new",
			async () => {
				console.log("healthKit:StepCount:new");
				invokeStepsData();
			},
		);
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:StepCount:setup:success",
			async () => {
				console.log("healthKit:StepCount:setup:success");
			},
		);
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:StepCount:setup:failure",
			async () => {
				console.log("healthKit:StepCount:setup:failure");
			},
		);
		new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
			"healthKit:StepCount:failure",
			async () => {
				console.log("healthKit:StepCount:failure");
			},
		);
	});
}
