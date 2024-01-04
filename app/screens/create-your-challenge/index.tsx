import { ScreenHeader } from "@/app/components/screen-header";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";

export function CreateYourChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Create your challenge" />
      <Bleed left="-10px" right="-10px">
        <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
          <Card challengeType="custom-steps" />
          <Card challengeType="custom-flights" />
          <Card challengeType="custom-distance" />
        </Box>
      </Bleed>
    </Layout>
  );
}
