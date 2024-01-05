import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { Challenge } from "@/app/store/challenges";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Completed = Pick<Challenge, "title" | "difficulty" | "emoji">;
interface Props extends Completed {
  count: number;
}

export function CompletedChallengeCard({
  title,
  difficulty,
  emoji,
  count,
}: Props) {
  const { styles, theme } = useStyles(stylesheet);

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
        <Text>Count: {count}</Text>
      </Box>
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
}));
