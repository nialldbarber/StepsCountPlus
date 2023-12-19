import { Box } from "@/app/design-system/components/box";
import type { PropsWithChildren } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { useStyles } from "react-native-unistyles";

export function Table({ children }: PropsWithChildren) {
	const { theme } = useStyles();
	const flattenedChildren = flattenChildren(children);

	const rowStyles = [
		{ backgroundColor: theme.colors.tableEvenBackgroundColor }, // Style for even rows
		{ backgroundColor: theme.colors.tableOddBackgroundColor }, // Style for odd rows
	];

	const styledChildren = flattenedChildren.map((child, index) => (
		<Box
			key={index}
			styles={rowStyles[index % rowStyles.length]}
			borderRadius="medium"
			padding="10px"
		>
			{child}
		</Box>
	));

	return <Box>{styledChildren}</Box>;
}
