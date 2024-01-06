import type { NegativeSpace } from "@/app/design-system/space";
import { negativeSpace } from "@/app/design-system/space";
import type { AlignItems, AlignSelf } from "@/app/types/styles";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";

type Props = {
  /**
   * The amount of negative space applied to the top
   */
  top?: NegativeSpace;
  /**
   * The amount of negative space applied to the bottom
   */
  bottom?: NegativeSpace;
  /**
   * The amount of negative space applied to the left
   */
  left?: NegativeSpace;
  /**
   * The amount of negative space applied to the right
   */
  right?: NegativeSpace;
  /**
   * The amount of negative space applied to the horizontal axis
   */
  horizontal?: NegativeSpace;
  /**
   * The amount of negative space applied to the vertical axis
   */
  vertical?: NegativeSpace;
  /**
   * Align items along the cross axis
   * This will override the `align-items` value
   */
  alignSelf?: AlignSelf;
  /**
   * Align items along the cross axis
   */
  alignItems?: AlignItems;
  /**
   * Style overrides
   */
  style?: ViewStyle;
};

export function Bleed({
  top = "0px",
  bottom = "0px",
  left = "0px",
  right = "0px",
  horizontal = "0px",
  vertical = "0px",
  children,
  style,
}: PropsWithChildren<Props>) {
  return (
    <View
      style={{
        marginTop: negativeSpace[top],
        marginLeft: negativeSpace[left],
        marginBottom: negativeSpace[bottom],
        marginRight: negativeSpace[right],
        marginHorizontal: negativeSpace[horizontal],
        marginVertical: negativeSpace[vertical],
        ...style,
      }}
    >
      {children}
    </View>
  );
}
