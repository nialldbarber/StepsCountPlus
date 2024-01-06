import { Box } from "@/app/design-system/components/box";
import type { PropsWithChildren } from "react";
import { useStyles } from "react-native-unistyles";

export function Row({ children }: PropsWithChildren) {
  const { theme } = useStyles();

  return (
    <Box
      backgroundColor={theme.colors.settingsCardBackgroundColor}
      padding="20px"
      marginHorizontal="20px"
      marginVertical="10px"
      borderRadius="large"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      shadow
    >
      {children}
    </Box>
  );
}
