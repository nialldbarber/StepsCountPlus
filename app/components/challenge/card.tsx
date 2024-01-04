import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { radius } from "@/app/design-system/radius";
import { getPercentageFromPeriod } from "@/app/lib/activity/challenge";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { convertMetersToKm } from "@/app/lib/format/measurements";
import type { ChallengeType } from "@/app/store/challenges";
import { Challenge, useChallengesStore } from "@/app/store/challenges";
import { Trash } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props extends Challenge {
  isSet?: boolean;
  fn: () => void;
  category: ChallengeType;
}

export function ChallengeCard({
  id,
  title,
  difficulty,
  emoji,
  isSet = false,
  startDate,
  target,
  category,
  fn,
}: Props) {
  const { styles, theme } = useStyles(stylesheet);
  const [percentage, setPercentage] = useState(0);
  const { setCompletedChallenge } = useChallengesStore();

  useEffect(() => {
    async function getPercentage() {
      try {
        if (!startDate) return;
        const finalPercentage = await getPercentageFromPeriod(
          category,
          startDate,
          target
        );

        if (
          category === "distance" ||
          category === "f1-tracks" ||
          category === "long-distance" ||
          category === "cycling"
        ) {
          setPercentage(convertMetersToKm(Number(finalPercentage)));
        } else {
          setPercentage(Number(finalPercentage));
        }
      } catch (error) {
        console.error("shit", error, title);
      }
    }
    getPercentage();
  }, [startDate, category]);

  useEffect(() => {
    if (Number(percentage) >= 100) {
      setCompletedChallenge({
        id,
        title,
        difficulty,
        emoji,
        startDate,
        target,
        category,
      });
    }
  }, [percentage]);

  return (
    <Box
      marginBottom="28px"
      position="relative"
      overflow="hidden"
      borderRadius="medium"
    >
      <Box
        backgroundColor={theme.colors.cardBackgroundColor}
        padding="20px"
        minHeight="120px"
      >
        <Box flexDirection="row" justifyContent="space-between" flexWrap="wrap">
          <Box flexDirection="row" flexWrap="wrap">
            <Box paddingRight="20px">
              <Text>{emoji}</Text>
            </Box>
            <Box flexShrink={1} width="7/10">
              <Text level="heading" size="18px">
                {title}
              </Text>
            </Box>
          </Box>
          <Box>
            <Box
              backgroundColor="greyFour"
              borderRadius="full"
              paddingVertical="6px"
              paddingHorizontal="6px"
              alignItems="center"
              justifyContent="center"
              marginBottom="10px"
              styles={styles.difficultyBadge(difficulty)}
            >
              <Text size="12px" color="black">
                {capitaliseFirstLetter(difficulty)}
              </Text>
            </Box>
          </Box>
        </Box>
        {isSet ? (
          <>
            <Box position="absolute" bottom="15px" right="15px">
              <Pressable onPress={fn} hitSlop={hitSlopLarge}>
                <Trash color={theme.colors.trashIconStroke} />
              </Pressable>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              paddingTop="30px"
            >
              <Text size="14px">{Math.round(percentage)}% complete</Text>
            </Box>
          </>
        ) : (
          <Box alignSelf="flex-start" paddingTop="34px">
            <Button shape="small" size="12px" color="white" onPress={fn}>
              Start challenge
            </Button>
          </Box>
        )}
      </Box>
      {isSet && <Box styles={styles.percent(percentage)} />}
    </Box>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  difficultyBadge: (difficulty) => ({
    backgroundColor:
      difficulty === "easy"
        ? theme.colors.cardSuccess
        : difficulty === "medium"
        ? theme.colors.cardWarning
        : theme.colors.cardError,
  }),
  percent: (percent) => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: `${Number(percent)}%`,
    height: 4,
    backgroundColor: theme.colors.cardPercentStroke,
    borderRadius: radius.full,
  }),
}));
