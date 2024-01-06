import { ScreenHeader } from "@/app/components/screen-header";
import { Pressable } from "@/app/core/pressable";
import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { radii } from "@/app/design-system/radii";
import { space } from "@/app/design-system/space";
import type { Challenge } from "@/app/store/challenges";
import { useChallengesStore } from "@/app/store/challenges";
import { useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

/**
 * Feat:
 * Custom
 */

export function CreateYourChallengeScreen() {
  const { styles } = useStyles(stylesheet);
  const [customChallengeAmount, setCustomChallengeAmount] = useState("");
  const { setAddChallenge } = useChallengesStore();

  const [currentChallenge, setCurrentChallenge] = useState<
    "steps" | "flights" | "distance"
  >("steps");

  const newChallenge: Challenge = {
    id: "custom-challenge",
    title: `${customChallengeAmount}`, // @TODO, format this
    difficulty: "easy", // @TODO, programatically calculate difficulty?
    emoji: "🛠️",
    startDate: new Date().toISOString(),
    target: Number(customChallengeAmount),
    category: "custom",
  };

  function handleFilterValue(text: string) {
    setCustomChallengeAmount(text);
  }

  function handleSelectChallenge(challenge: "steps" | "flights" | "distance") {
    setCurrentChallenge(challenge);
  }

  return (
    <Layout>
      <ScreenHeader title="Select a category" />
      <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
        <Pressable
          onPress={() => handleSelectChallenge("steps")}
          style={styles.container(currentChallenge === "steps")}
        >
          <Text>👟</Text>
          <Text>Steps</Text>
        </Pressable>
        <Pressable
          onPress={() => handleSelectChallenge("flights")}
          style={styles.container(currentChallenge === "flights")}
        >
          <Text>🪜</Text>
          <Text>Flights</Text>
        </Pressable>
        <Pressable
          onPress={() => handleSelectChallenge("distance")}
          style={styles.container(currentChallenge === "distance")}
        >
          <Text>📍</Text>
          <Text>Distance</Text>
        </Pressable>
      </Box>
      <Box paddingLeft="10px" paddingBottom="10px">
        <Text size="14px" color="greyFour">
          Enter steps amount:
        </Text>
        <Text size="12px" color="greyFour">
          (minimum 1000 steps)
        </Text>
      </Box>
      <Stack gutter="10px">
        <Input keyboardType="numeric" onChangeText={handleFilterValue} />
        <Text>{customChallengeAmount}</Text>
        <Button>Add</Button>
      </Stack>
    </Layout>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: (isActive) => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: space["8px"],
    borderRadius: radii.larger,
    minHeight: space["104px"],
    backgroundColor: colors.blackTwo,
    borderWidth: 2,
    borderColor: isActive ? colors.primary : colors.blackTwo,
  }),
}));
