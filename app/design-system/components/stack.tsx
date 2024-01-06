import { Box } from "@/app/design-system/components/box";
import type { Space } from "@/app/design-system/space";
import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import type { ViewProps } from "react-native";

interface StackProps extends ViewProps {
  /**
   * The amount of space around all
   * child elements
   */
  margin?: Space;
  /**
   * The amount of space between each
   * child element
   */
  gutter?: Space;
}

export function Stack({
  margin = "0px",
  gutter = "0px",
  children: childProp,
}: PropsWithChildren<StackProps>) {
  const children = flattenChildren(childProp);

  return (
    <Box margin={margin}>
      {Children.map(children, (child, index) => {
        const first = index === 0;
        const last = index === children.length - 1;

        return (
          <Box
            paddingTop={first ? "0px" : gutter}
            paddingBottom={last ? "0px" : gutter}
          >
            {child}
          </Box>
        );
      })}
    </Box>
  );
}
