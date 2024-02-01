import { Box } from "@/app/design-system/components/box";
import type { Space } from "@/app/design-system/space";
import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import type { ViewProps } from "react-native";
import { Width } from "../size";

interface VStackProps extends ViewProps {
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
	/**
	 * The overrided width of the element
	 */
	width?: Width | Space;
}

export function VStack({
	margin = "0px",
	gutter = "0px",
	width,
	children: childProp,
	...rest
}: PropsWithChildren<VStackProps>) {
	const children = flattenChildren(childProp);

	return (
		<Box margin={margin} width={width} {...rest}>
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
