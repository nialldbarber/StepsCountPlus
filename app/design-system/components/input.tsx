import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { radii } from "@/app/design-system/radii";
import { heights } from "@/app/design-system/size";
import { space } from "@/app/design-system/space";
import { CloseCircle } from "iconsax-react-native";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { colors } from "../colors";

interface Props extends TextInputProps {
  handleDeleteValue?: () => void;
}

export function Input({
  value,
  placeholder,
  keyboardType,
  onChangeText,
  handleDeleteValue,
}: Props) {
  const [active, setActive] = useState(false);
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Box shadow position="relative">
      <TextInput
        style={styles.container(active)}
        value={value}
        onChangeText={(text) => onChangeText?.(text)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.inputPlaceholderColor}
        keyboardType={keyboardType}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {value?.length > 0 && (
        <Box position="absolute" right="12px" top="12px">
          <Pressable onPress={handleDeleteValue}>
            <CloseCircle color={theme.colors.inputIconColor} />
          </Pressable>
        </Box>
      )}
    </Box>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: (active) => ({
    // backgroundColor: theme.colors.inputBackgroundColor,
    backgroundColor: active ? colors.black : colors.blackTwo,
    borderColor: colors.blackTwo,
    borderWidth: 2,
    paddingHorizontal: space["20px"],
    height: heights["46px"],
    borderRadius: radii.full,
    color: theme.colors.inputPlaceholderColor,
    fontSize: 16,
  }),
}));
