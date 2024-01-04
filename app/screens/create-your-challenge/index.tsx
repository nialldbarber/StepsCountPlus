import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";

export function CreateYourChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Create your challenge" />
      <Box paddingTop="20px" alignItems="center">
        <Text size="12px">Hello there</Text>
      </Box>
    </Layout>
  );
}
