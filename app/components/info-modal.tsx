import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Pressable } from "@/app/core/pressable";
import { InfoCircle } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

type Props = {
  handlePresentModalPress: () => void;
};

export function InfoModal({ handlePresentModalPress }: Props) {
  const { theme } = useStyles();

  return (
    <Pressable onPress={handlePresentModalPress} hitSlop={hitSlopLarge}>
      <InfoCircle color={theme.colors.infoStroke} size={22} />
    </Pressable>
  );
}
