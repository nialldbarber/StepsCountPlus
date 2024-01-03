import { BarChart } from "@/app/components/bar-chart";
import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import {
  PeriodIntervals,
  getPercentageFromPeriod,
  getSegmentsFromPeriod,
} from "@/app/lib/activity/challenge";
import { readableDate } from "@/app/lib/format/dates";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import { determinePercentage } from "@/app/lib/format/numbers";
import type { RootChallengesScreen } from "@/app/navigation/types";
import { MenuView } from "@react-native-menu/menu";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";

type Props = NativeStackScreenProps<RootChallengesScreen, "CurrentChallenge">;

export function CurrentChallengeScreen({
  route: {
    params: { challenge },
  },
}: Props) {
  const [percentage, setPercentage] = useState(0);
  const [period, setPeriod] = useState<PeriodIntervals>("24hours");
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function getSegmentsAndPercentage() {
      try {
        if (!challenge.startDate) return;
        const segments = await getSegmentsFromPeriod(
          challenge.category,
          challenge.startDate,
          period
        );

        setSegments(segments);

        const percentage = await getPercentageFromPeriod(
          challenge.category,
          challenge.startDate
        );

        if (
          challenge.category === "distance" ||
          challenge.category === "f1-tracks" ||
          challenge.category === "long-distance"
        ) {
          setPercentage(convertMetersToKm(percentage as number));
        } else {
          setPercentage(percentage as number);
        }
      } catch (error) {
        console.error("Failed to get segments or percentage", error);
      }
    }
    getSegmentsAndPercentage();

    return () => {
      isMounted = false;
    };
  }, [period]);

  const percent = useMemo(
    () => determinePercentage(percentage, challenge.target),
    [percentage, challenge.target]
  );

  // console.log("S E G M E N T S:", segments);

  return (
    <Layout>
      <ScreenHeader title={challenge.title} />
      <Box paddingTop="20px">
        <MenuView
          style={{ alignSelf: "flex-end" }}
          title="Time period"
          onPressAction={({ nativeEvent }) => {
            setPeriod(nativeEvent.event);
          }}
          actions={[
            {
              id: "24hours",
              title: "24 hours",
            },
            {
              id: "1week",
              title: "1 week",
            },
            {
              id: "1month",
              title: "1 month",
            },
            {
              id: "1year",
              title: "1 year",
            },
          ]}
        >
          <Pressable forceHaptic>
            <Box
              alignSelf="flex-end"
              backgroundColor="blackTwo"
              paddingVertical="5px"
              paddingHorizontal="10px"
              borderRadius="large"
            >
              <Text>{PERIOD_MAP[period]}</Text>
            </Box>
          </Pressable>
        </MenuView>
      </Box>
      <Box>
        <Text>{challenge.category}</Text>
        <Text>Target: {challenge.target}</Text>
        <Text>Start date: {readableDate(challenge?.startDate)}</Text>
        <Text>Percent complete: {percent}%</Text>
      </Box>
      <BarChart data={segments} />
    </Layout>
  );
}

const PERIOD_MAP = {
  "24hours": "24 hours",
  "1week": "1 week",
  "1month": "1 month",
  "1year": "1 year",
};
