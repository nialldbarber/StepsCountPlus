import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";

export function CreateYourChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Select a category" />
      <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
        <Card challengeType="custom-steps" />
        <Card challengeType="custom-flights" />
        <Card challengeType="custom-distance" />
      </Box>
    </Layout>
  );
}
