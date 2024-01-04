import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Text } from "@/app/design-system/components/text";
import { capitaliseFirstLetter, removeDashes } from "@/app/lib/format/alpha";
import type { A11y } from "@/app/lib/misc-types";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";
import { useStyles } from "react-native-unistyles";

interface Props extends A11y {
  back?: boolean;
  title: string;
}

export function ScreenHeader({
  back = true,
  title,
  a11yHint,
  a11yRole,
  a11yLabel,
  a11yState,
}: Props) {
  const { theme } = useStyles();
  const { goBack } = useNavigation();

  return (
    <>
      {back && (
        <Box>
          <Pressable
            onPress={goBack}
            accessible
            accessibilityLabel="Press to go back to home screen"
          >
            <ArrowLeft size={28} color={theme.colors.goBackStroke} />
          </Pressable>
        </Box>
      )}
      <Box paddingLeft="10px" alignSelf="center">
        <Text level="heading" size="23px" weight="bold">
          {removeDashes(capitaliseFirstLetter(title))}
        </Text>
      </Box>
    </>
  );
}
