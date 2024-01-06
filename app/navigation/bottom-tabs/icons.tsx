import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { Award, Chart, ProfileCircle, StatusUp } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

type Props = {
  route: "STATS" | "CHALLENGES" | "GOALS" | "PROFILE";
  isFocused: boolean;
};

export function BottomTabsIcon({ route, isFocused }: Props) {
  const { theme } = useStyles();
  const ICON_DIMENSIONS = 20;

  const icon = () => {
    switch (route) {
      case "STATS":
        return (
          <Chart
            color={
              isFocused ? colors.primary : theme.colors.bottomTabsIconStroke
            }
            size={ICON_DIMENSIONS}
          />
        );
      case "CHALLENGES":
        return (
          <StatusUp
            color={
              isFocused ? colors.primary : theme.colors.bottomTabsIconStroke
            }
            size={ICON_DIMENSIONS}
          />
        );
      case "GOALS":
        return (
          <Award
            color={
              isFocused ? colors.primary : theme.colors.bottomTabsIconStroke
            }
            size={ICON_DIMENSIONS}
          />
        );
      case "PROFILE":
        return (
          <ProfileCircle
            color={
              isFocused ? colors.primary : theme.colors.bottomTabsIconStroke
            }
            size={ICON_DIMENSIONS}
          />
        );
    }
  };

  return <Box>{icon()}</Box>;
}
