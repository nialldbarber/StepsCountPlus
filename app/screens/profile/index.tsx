import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const isSubscribed = false;

export function ProfileScreen() {
  const [count, setCount] = useState(0);
  const { styles } = useStyles(stylesheet);
  const { navigate } = useNavigation();

  useFocusEffect(() => {
    if (isSubscribed === false && count % 10 === 0) {
      navigate("Premium");
      console.log("I AM FOCUSED");
    }
    setCount(count + 1);
  });

  return (
    <Layout>
      <ScreenHeader title="Profile" back={false} />
      <Box styles={styles.container} paddingVertical="20px">
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
