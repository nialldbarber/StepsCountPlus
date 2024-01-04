import type { AccessibilityRole, AccessibilityState } from "react-native";

export type A11y = {
  a11yLabel?: string;
  a11yHint?: string;
  a11yRole?: AccessibilityRole;
  a11yState?: AccessibilityState;
};

export type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};

export type PrependToUnion<
  U extends string,
  T extends string
> = U extends unknown ? `${T}-${U}` : never;
