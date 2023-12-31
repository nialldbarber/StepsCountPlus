import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function ProfileScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <Layout>
      <ScreenHeader title="Profile" />
      <Box styles={styles.container}>
        <Text>
          Become a member to get access to all the features of the app.
        </Text>
      </Box>
    </Layout>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
