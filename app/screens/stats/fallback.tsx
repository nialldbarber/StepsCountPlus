import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";

export function Fallback() {
  return (
    <Layout>
      <Box>
        <Text>Stats Fallback</Text>
      </Box>
    </Layout>
  );
}
