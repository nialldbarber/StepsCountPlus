import { DailyDistanceGoal } from "@/app/components/goals/distance";
import { DailyFlightsGoal } from "@/app/components/goals/flights";
import { DailyStepsGoal } from "@/app/components/goals/steps";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";

export function GoalsScreen() {
  return (
    <Layout>
      <Stack gutter="10px">
        {/* TODO move this into an info box */}
        {/* <Text level="heading" withEmoji textStyles={{ lineHeight: 23 }}>
					Set your steps, flights, and distance goals and track your progress 💪
				</Text> */}
        <DailyStepsGoal />
        <DailyFlightsGoal />
        <DailyDistanceGoal />
      </Stack>
    </Layout>
  );
}
