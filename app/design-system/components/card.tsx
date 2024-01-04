import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { PrependToUnion } from "@/app/lib/misc-types";
import type { ChallengeTypes } from "@/app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import type { Union } from "ts-toolbelt";

type CustomChallengeTypes = PrependToUnion<
  Union.Exclude<"steps" | "flights" | "distance", "custom">,
  "custom"
>;
type Props =
  | {
      challengeType: ChallengeTypes;
    }
  | {
      challengeType: CustomChallengeTypes;
    };

export const CHALLENGE_TYPES: Record<string, string> = {
  custom: "Custom",
  steps: "Steps",
  distance: "Distance",
  flights: "Flights",
  "long-distance": "Long Distances",
  "f1-tracks": "F1 Tracks",
  cycling: "Cycling",
};

export const CHALLENGE_EMOJI_TYPES: Record<string, string> = {
  custom: "🛠️",
  steps: "👟",
  distance: "📍",
  flights: "🪜",
  "long-distance": "🏃",
  "f1-tracks": "🏎️",
  cycling: "🚴",
};

export const CHALLENGE_INFO_TYPES: Record<string, string> = {
  custom: "Create your own challenge",
  steps: "Step count, walking, running",
  distance: "Walking, running, cycling",
  flights: "Tall buildings, mountains",
  "long-distance": "Marathons, train jounreys, rivers",
  "f1-tracks": "Tracks from around the world",
  cycling: "Famous cycling routes, stages of the grand tours",
};

const { width } = Dimensions.get("window");

export function Card({ challengeType }: Props) {
  const { navigate } = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const isCustom =
    challengeType === "custom-steps" ||
    challengeType === "custom-flights" ||
    challengeType === "custom-distance";

  function handleNavigateToChallenge() {
    if (isCustom) {
      navigate("CreateYourChallenge");
    } else if (challengeType === "custom") {
      navigate("CreateYourChallenge");
    } else {
      navigate("SingleChallenge", { challengeType });
    }
  }

  return (
    <Box
      position="relative"
      backgroundColor={theme.colors.cardBackgroundColor}
      padding="20px"
      margin="10px"
      borderRadius="larger"
      minHeight="150px"
      styles={{ width: width / 2 - 30 }}
      shadow
    >
      <Pressable style={styles.button} onPress={handleNavigateToChallenge}>
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
