import { ChallengeCard } from "@/app/components/challenge/card";
import { Bleed } from "@/app/design-system/components/bleed";
import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Layout } from "@/app/design-system/components/layout";
import { Pressable } from "@/app/design-system/components/pressable";
import { Row } from "@/app/design-system/components/row";
import { Text } from "@/app/design-system/components/text";
import { space } from "@/app/design-system/space";
import { capitaliseFirstLetter } from "@/app/lib/format/alpha";
import { ChallengeType, useChallengesStore } from "@/app/store/challenges";
import { MenuView } from "@react-native-menu/menu";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Filter } from "iconsax-react-native";
import { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from "react-native-unistyles";

const { height } = Dimensions.get("screen");

export function ChallengesScreen() {
  const { styles, theme } = useStyles(stylesheet);

  const [currentFilter, setCurrentFilter] = useState<ChallengeType>("all");
  const [currentFilterScreen, setCurrentFilterScreen] = useState<
    "in-progress" | "completed"
  >("in-progress");

  const { navigate } = useNavigation();
  const { challenges, completedChallenges, setRemoveChallenge } =
    useChallengesStore();

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
          <Row marginHorizontal="15px" a11yRole="tablist" scroll>
            <Box flexDirection="row">
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
                  styles={styles.currentFilterScreen(false)}
                >
                  <Text textStyles={styles.challengeChipText}>Add New</Text>
                </Box>
              </Pressable>
            </Box>
          </Row>
        </Bleed>

        <Box
          paddingBottom="20px"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text size="12px">Filter: </Text>
          <Filter size={20} color={theme.colors.filterStroke} />
          <MenuView
            style={{ alignSelf: "flex-end" }}
            title="Filter by category"
            themeVariant={
              UnistylesRuntime.themeName === "dark" ? "dark" : "light"
            }
            onPressAction={({ nativeEvent }) => {
              setCurrentFilter(nativeEvent.event as ChallengeType);
            }}
            actions={[
              {
                id: "all",
                title: "All",
              },
              {
                id: "steps",
                title: "Steps",
              },
              {
                id: "distance",
                title: "Distance",
              },
              {
                id: "flights",
                title: "Flights",
              },
              {
                id: "long-distance",
                title: "Long Distance",
              },
              {
                id: "f1-tracks",
                title: "F1 Tracks",
              },
            ]}
          >
            <Pressable forceHaptic>
              <Box
                alignSelf="flex-end"
                backgroundColor={theme.colors.chipFilterBackground}
                paddingVertical="5px"
                paddingHorizontal="15px"
                borderRadius="full"
                marginLeft="5px"
              >
                <Text>{capitaliseFirstLetter(currentFilter)}</Text>
              </Box>
            </Pressable>
          </MenuView>
        </Box>

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
                  <Text weight="bold" textStyles={styles.textEmpty}>
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
                <Button
                  onPress={() => navigate("SelectChallenge")}
                  color="white"
                >
                  Start a Challenge
                </Button>
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
              <Text weight="bold" textStyles={styles.textEmpty}>
                Looks like you haven't {"\n"} started a challenge!
              </Text>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              paddingTop="20px"
              paddingBottom="36px"
            >
              <Text level="heading" weight="bold" size="44px">
                🙈
              </Text>
            </Box>
            <Button onPress={() => navigate("SelectChallenge")} color="white">
              Start a Challenge
            </Button>
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
  textEmpty: {
    textAlign: "center",
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
