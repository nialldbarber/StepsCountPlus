import type { AccessibilityRole, AccessibilityState } from "react-native";

export type A11y = {
  a11yLabel?: string;
  a11yHint?: string;
  a11yRole?: AccessibilityRole;
  a11yState?: AccessibilityState;
};
