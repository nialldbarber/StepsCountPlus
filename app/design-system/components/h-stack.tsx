import { Box } from "@/app/design-system/components/box";
import type { Space } from "@/app/design-system/space";
import type { A11y } from "@/app/types/a11y";
import type { JustifyContent } from "@/app/types/styles";
import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { ScrollView, type ViewProps } from "react-native";

interface HStackProps extends ViewProps, Partial<A11y> {
	/**
	 * The amount of space around all
	 * child elements
	 */
	margin?: Space;
	/**
	 * The amount of space above and below
	 * all child elements
	 */
	marginTop?: Space;
	/**
	 * The amount of space below child
	 * elements
	 */
	marginBottom?: Space;
	/**
	 * The amount of space to the above and
	 * below of all child elements
	 */
	marginVertical?: Space;
	/**
	 * The amount of space to the left and
	 * right of all child elements
	 */
	marginHorizontal?: Space;
	/**
	 * The amount of spacing between each
	 * child elements
	 *
	 */
	gutter?: Space;
	/**
	 * Whether the row should scroll
	 * horizontally
	 */
	scroll?: boolean;
	/**
	 * The alignment of the child elements
	 * along the main axis
	 */
	justifyContent?: JustifyContent;
}

function InnerHStack({
	margin = "0px",
	marginVertical,
	marginHorizontal,
	marginTop,
	marginBottom,
	gutter = "0px",
	justifyContent,
	a11yLabel,
	a11yHint,
	a11yRole,
	children: childProp,
}: PropsWithChildren<HStackProps>) {
	const children = flattenChildren(childProp);
	return (
		<Box
			margin={margin}
			marginVertical={marginVertical}
			marginHorizontal={marginHorizontal}
			marginTop={marginTop}
			marginBottom={marginBottom}
			flexDirection="row"
			alignItems="center"
			justifyContent={justifyContent}
			a11yRole={a11yRole}
			a11yLabel={a11yLabel}
			a11yHint={a11yHint}
		>
			{Children.map(children, (child, index) => {
				const first = index === 0;
				const last = index === children.length - 1;
				return (
					<Box
						paddingLeft={first ? "0px" : gutter}
						paddingRight={last ? "0px" : gutter}
					>
						{child}
					</Box>
				);
			})}
		</Box>
	);
}

export function HStack({
	margin = "0px",
	marginVertical,
	marginHorizontal,
	marginTop,
	marginBottom,
	gutter = "0px",
	scroll = false,
	justifyContent,
	a11yLabel,
	a11yHint,
	a11yRole,
	children,
}: HStackProps) {
	return scroll ? (
		<ScrollView
			scrollEnabled={scroll}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			<InnerHStack
				margin={margin}
				marginVertical={marginVertical}
				marginHorizontal={marginHorizontal}
				marginTop={marginTop}
				marginBottom={marginBottom}
				gutter={gutter}
				justifyContent={justifyContent}
				a11yLabel={a11yLabel}
				a11yHint={a11yHint}
				a11yRole={a11yRole}
			>
				{children}
			</InnerHStack>
		</ScrollView>
	) : (
		<InnerHStack
			margin={margin}
			gutter={gutter}
			justifyContent={justifyContent}
			a11yLabel={a11yLabel}
			a11yHint={a11yHint}
			a11yRole={a11yRole}
		>
			{children}
		</InnerHStack>
	);
}
