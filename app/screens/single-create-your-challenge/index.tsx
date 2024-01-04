import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";

export function SingleCreateYourChallengeScreen() {
  return (
    <Layout>
      <ScreenHeader title="Select a category" />
      <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
        <Text>hello</Text>
      </Box>
    </Layout>
  );
}
