import type { NegativeSpace } from "@/app/design-system/space";
import { negativeSpace } from "@/app/design-system/space";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";

type Props = {
	top?: NegativeSpace;
	bottom?: NegativeSpace;
	left?: NegativeSpace;
	right?: NegativeSpace;
	horizontal?: NegativeSpace;
	vertical?: NegativeSpace;
	style?: ViewStyle;
};

export function Bleed({
	top,
	bottom,
	left,
	right,
	horizontal,
	vertical,
	children,
	style,
	...rest
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
			{...rest}
		>
			{children}
		</View>
	);
}
