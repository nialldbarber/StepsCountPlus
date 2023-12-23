import { BarChart } from "@/app/components/bar-chart";
import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useEffectOnce } from "@/app/hooks/useEffectOnce";
import { getMeasurementFromDate } from "@/app/lib/activity/challenge";
import { readableDate } from "@/app/lib/format/dates";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import { determinePercentage } from "@/app/lib/format/numbers";
import type { RootChallengesScreen } from "@/app/navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";

type Props = NativeStackScreenProps<RootChallengesScreen, "CurrentChallenge">;

export function CurrentChallengeScreen({
	route: { params: { challenge } },
}: Props) {
	console.log(JSON.stringify(challenge, null, 2));

	const [percentage, setPercentage] = useState(0);

	useEffectOnce(() => {
		async function getPercentage() {
			try {
				if (!challenge.startDate) return;
				const [finalPercentage, segments] = await getMeasurementFromDate(
					challenge.category,
					challenge.startDate,
					true,
				);

				console.log("SEGMENTS", JSON.stringify(segments, null, 2));

				if (
					challenge.category === "distance" ||
					challenge.category === "f1-tracks" ||
					challenge.category === "long-distance"
				) {
					setPercentage(convertMetersToKm(finalPercentage));
				} else {
					setPercentage(finalPercentage);
				}
			} catch (error) {
				console.error("shit");
			}
		}
		getPercentage();
	});

	const percent = useMemo(
		() => determinePercentage(percentage, challenge.target),
		[percentage, challenge.target],
	);

	return (
		<Layout>
			<ScreenHeader title={challenge.title} />
			<Box>
				<Text>{challenge.category}</Text>
				<Text>Target: {challenge.target}</Text>
				<Text>Start date: {readableDate(challenge.startDate)}</Text>
				<Text>Percent complete: {percent}%</Text>
			</Box>
			<BarChart />
		</Layout>
	);
}
