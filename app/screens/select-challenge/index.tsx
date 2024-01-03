import { ScreenHeader } from "@/app/components/screen-header";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Card } from "@/app/design-system/components/card";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";

export function SelectChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Choose a category" />
      <Box paddingTop="20px" alignItems="center">
        <Text size="12px">
          (You may only choose one challenge per category!)
        </Text>
      </Box>
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
