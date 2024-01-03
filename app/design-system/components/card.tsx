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

export const CHALLENGE_INFO_TYPES: Record<string, string> = {
  steps: "Step count, walking, running",
  distance: "Walking, running, cycling",
  flights: "Tall buildings, mountains",
  "long-distance": "Marathons, train jounreys",
  "f1-tracks": "Tracks from around the world",
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
        <Box marginLeft="20px" marginRight="24px" alignItems="center">
          <Text level="heading" size="44px">
            {CHALLENGE_EMOJI_TYPES[challengeType]}
          </Text>
        </Box>
        <Box paddingTop="10px">
          <Text>{CHALLENGE_TYPES[challengeType]}</Text>
        </Box>
        <Box paddingHorizontal="20px" paddingTop="5px">
          <Text
            size="11px"
            color="greyFour"
            textStyles={{ textAlign: "center" }}
          >
            {CHALLENGE_INFO_TYPES[challengeType]}
          </Text>
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
