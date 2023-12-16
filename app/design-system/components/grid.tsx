import { Box } from "@/app/design-system/components/box";
import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import type { ViewStyle } from "react-native";

type Props = {
	gap?: number;
	direction?: "vertical" | "horizontal";
	style?: ViewStyle;
	flex?: number;
	divider?: React.ReactNode;
};

export function Gap({
	gap = 4,
	direction = "vertical",
	style,
	flex = direction === "horizontal" ? 1 : undefined,
	divider,
	children,
}: PropsWithChildren<Props>) {
	const kids = flattenChildren(children);
	const flexDirection = direction === "vertical" ? "column" : "row";
	const styleKey = direction === "vertical" ? "height" : "width";

	return (
		<Box styles={[{ flexDirection }, style]}>
			{Children.map(kids, (child, index) => {
				return (
					<>
						{index > 0 ? divider || <Box styles={{ [styleKey]: gap }} /> : null}
						<Box flexBasis="50%" styles={{ flex }}>
							{child}
						</Box>
					</>
				);
			})}
		</Box>
	);
}
