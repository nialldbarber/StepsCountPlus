import { Box } from "@/app/design-system/components/box";
import type { Space } from "@/app/design-system/space";
import type { A11y } from "@/app/lib/misc-types";
import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { ScrollView, type ViewProps } from "react-native";

interface RowProps extends ViewProps, Partial<A11y> {
	margin?: Space;
	marginTop?: Space;
	marginBottom?: Space;
	marginVertical?: Space;
	marginHorizontal?: Space;
	gutter?: Space;
	scroll?: boolean;
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around";
}

function InnerRow({
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
}: PropsWithChildren<RowProps>) {
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

export function Row({
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
}: RowProps) {
	return scroll ? (
		<ScrollView
			scrollEnabled={scroll}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			<InnerRow
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
			</InnerRow>
		</ScrollView>
	) : (
		<InnerRow
			margin={margin}
			gutter={gutter}
			justifyContent={justifyContent}
			a11yLabel={a11yLabel}
			a11yHint={a11yHint}
			a11yRole={a11yRole}
		>
			{children}
		</InnerRow>
	);
}
