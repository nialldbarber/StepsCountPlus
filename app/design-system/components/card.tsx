import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import type { ChallengeTypes } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
  challengeType: ChallengeTypes;
};

export const CHALLENGE_TYPES: Record<string, string> = {
  steps: "Steps",
  distance: "Distance",
  flights: "Flights",
  "long-distance": "Long Distances",
  "f1-tracks": "F1 Tracks",
};

export const CHALLENGE_EMOJI_TYPES: Record<string, string> = {
  steps: "👟",
  distance: "📍",
  flights: "🪜",
  "long-distance": "🏃",
  "f1-tracks": "🏎️",
};

const { width } = Dimensions.get("window");

export function Card({ challengeType }: Props) {
  const { navigate } = useNavigation();
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Box
      position="relative"
      backgroundColor={theme.colors.cardBackgroundColor}
      padding="20px"
      margin="10px"
      borderRadius="larger"
      minHeight="150px"
      styles={{ width: width / 2 - 40 }}
      shadow
    >
      <Pressable
        style={styles.button}
        onPress={() => navigate("SingleChallenge", { challengeType })}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width="full"
        >
          <Box
            backgroundColor="orange_light"
            marginLeft="20px"
            marginRight="24px"
            height="80px"
            width="80px"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
          >
            <Text level="heading" size="44px">
              {CHALLENGE_EMOJI_TYPES[challengeType]}
            </Text>
          </Box>
        </Box>
        <Box paddingTop="10px">
          <Text>{CHALLENGE_TYPES[challengeType]}</Text>
        </Box>
      </Pressable>
    </Box>
  );
}

const stylesheet = createStyleSheet(() => ({
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    lineHeight: 14,
  },
}));
