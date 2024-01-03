import { ScreenHeader } from "@/app/components/screen-header";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";

export function SelectChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Choose a category" />
      <Bleed left="-10px" right="-10px">
        <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
          <Card challengeType="steps" />
          <Card challengeType="distance" />
          <Card challengeType="flights" />
          <Card challengeType="long-distance" />
          <Card challengeType="f1-tracks" />
        </Box>
      </Bleed>
    </Layout>
  );
}
