import { ChallengeCard } from "@/app/components/challenge/card";
import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Chip } from "@/app/design-system/components/chip";
import { Layout } from "@/app/design-system/components/layout";
import { Pressable } from "@/app/design-system/components/pressable";
import { Row } from "@/app/design-system/components/row";
import { Text } from "@/app/design-system/components/text";
import { space } from "@/app/design-system/space";
import { useActiveValue } from "@/app/hooks/useActiveValue";
import { RootChallengesScreen } from "@/app/navigation/types";
import {
  ChallengeType,
  challengeTypes,
  useChallengesStore,
} from "@/app/store/challenges";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = NativeStackScreenProps<RootChallengesScreen, "ChallengesRoot">;

const { height } = Dimensions.get("screen");

export function ChallengesScreen({ route }: Props) {
  const { styles, theme } = useStyles(stylesheet);
  const filter = route?.params?.currentFilter ?? "all";

  const [currentFilter, setCurrentFilter] = useState<ChallengeType>(
    filter as ChallengeType
  );
  const [currentFilterScreen, setCurrentFilterScreen] = useState<
    "in-progress" | "completed"
  >("in-progress");

  const { navigate } = useNavigation();
  const { challenges, completedChallenges, setRemoveChallenge } =
    useChallengesStore();
  const { value, handleActiveValue } = useActiveValue();

  const filterChallengesByCategory = useMemo(() => {
    if (currentFilter.toLowerCase() === "all") {
      return challenges;
    }

    const filteredResults = challenges.filter((item) => {
      const category = item.category || item.id.split("-")[0];
      return (
        category.toLowerCase() ===
        currentFilter.toLowerCase().replaceAll(" ", "-")
      );
    });
    return filteredResults;
  }, [challenges, currentFilter]);

  console.log("completedChallenges:", completedChallenges);

  return (
    <Layout>
      <Box>
        <Bleed left="-20px" right="-20px" style={styles.bleed}>
          <Row
            marginHorizontal="20px"
            marginBottom="10px"
            gutter="6px"
            a11yRole="tablist"
            scroll
          >
            {challengeTypes.map(({ id, type }, index) => {
              return (
                <Chip
                  key={id}
                  label={type}
                  onPress={() => {
                    handleActiveValue(index);
                    setCurrentFilter(type as ChallengeType);
                  }}
                  a11yLabel="test"
                  a11yRole="menu"
                  hitSlop={hitSlopLarge}
                  isSelected={index === value}
                  size="16px"
                  height="36px"
                />
              );
            })}
          </Row>
        </Bleed>

        <Bleed left="-20px" right="-20px" style={styles.bleed}>
          <Row marginHorizontal="15px" a11yRole="tablist" scroll>
            <Box flexDirection="row" marginBottom="20px">
              <Pressable onPress={() => setCurrentFilterScreen("in-progress")}>
                <Box
                  backgroundColor={theme.colors.chipChallengesBackground}
                  paddingVertical="5px"
                  paddingHorizontal="15px"
                  borderRadius="full"
                  marginHorizontal="5px"
                  borderWidth={1}
                  styles={styles.currentFilterScreen(
                    currentFilterScreen === "in-progress"
                  )}
                >
                  <Text textStyles={styles.challengeChipText}>In Progress</Text>
                </Box>
              </Pressable>
              <Pressable onPress={() => setCurrentFilterScreen("completed")}>
                <Box
                  backgroundColor={theme.colors.chipChallengesBackground}
                  paddingVertical="5px"
                  paddingHorizontal="15px"
                  borderRadius="full"
                  marginHorizontal="5px"
                  borderWidth={1}
                  styles={styles.currentFilterScreen(
                    currentFilterScreen === "completed"
                  )}
                >
                  <Text textStyles={styles.challengeChipText}>Completed</Text>
                </Box>
              </Pressable>
              <Pressable onPress={() => navigate("SelectChallenge")}>
                <Box
                  backgroundColor={theme.colors.chipChallengesBackground}
                  paddingVertical="5px"
                  paddingHorizontal="15px"
                  borderRadius="full"
                  marginHorizontal="5px"
                  borderWidth={1}
                  borderColor="pureWhite"
                >
                  <Text textStyles={styles.challengeChipText}>Add New</Text>
                </Box>
              </Pressable>
            </Box>
          </Row>
        </Bleed>

        {currentFilterScreen === "completed" ? (
          <Box>
            {completedChallenges.length > 0 ? (
              <FlashList
                data={completedChallenges}
                estimatedItemSize={300}
                renderItem={({ item }) => (
                  <Box>
                    <Text>{item.title}</Text>
                  </Box>
                )}
              />
            ) : (
              <Box
                flex={1}
                styles={{ height: height / 2 }}
                alignItems="center"
                justifyContent="center"
              >
                <Box justifyContent="center" paddingVertical="20px">
                  <Text weight="bold">
                    Looks like you haven't {"\n"} completed a challenge!
                  </Text>
                </Box>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  paddingTop="20px"
                  paddingBottom="42px"
                >
                  <Text level="heading" weight="bold" size="44px">
                    🙈
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        ) : challenges.length > 0 ? (
          <Box>
            <FlashList
              data={filterChallengesByCategory}
              estimatedItemSize={300}
              renderItem={({ item }) => (
                // <Pressable
                //   onPress={() =>
                //     navigate("CurrentChallenge", { challenge: item })
                //   }
                // >
                <ChallengeCard
                  challenge={filterChallengesByCategory}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  difficulty={item.difficulty}
                  emoji={item.emoji}
                  isSet
                  fn={() => setRemoveChallenge(item.id)}
                  startDate={item.startDate}
                  target={item.target}
                  category={item.category}
                />
                // </Pressable>
              )}
            />
          </Box>
        ) : (
          <Box
            flex={1}
            styles={{ height: height / 2 }}
            alignItems="center"
            justifyContent="center"
          >
            <Box justifyContent="center" paddingVertical="20px">
              <Text weight="bold">
                Looks like you haven't {"\n"} started a challenge!
              </Text>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              paddingTop="20px"
              paddingBottom="42px"
            >
              <Text level="heading" weight="bold" size="44px">
                🙈
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  bleed: {
    marginBottom: space["15px"],
  },
  text: {
    marginTop: space["6px"],
  },
  currentFilterScreen: (isActive) => ({
    borderColor: isActive
      ? theme.colors.chipChallengesActiveBorder
      : theme.colors.chipChallengesBorder,
  }),
  challengeChipText: {
    color: theme.colors.chipChallengesColor,
  },
}));
