import type { Colors } from "@/app/design-system/colors";
import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	/**
	 * Explicit background color
	 * overrides the default theme background color
	 * if necessary
	 */
	backgroundColor?: Colors | string;
};

export function Layout({
	children,
	backgroundColor,
}: PropsWithChildren<Props>) {
	const { styles } = useStyles(stylesheet);

	return (
		<SafeAreaView style={styles.container(backgroundColor)}>
			<ScrollView>
				<Box padding="20px" marginBottom="52px">
					{children}
				</Box>
			</ScrollView>
		</SafeAreaView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: (backgroundColor) => ({
		flex: 1,
		backgroundColor: backgroundColor
			? colors[backgroundColor]
			: theme.colors.screenBackgroundColor,
	}),
}));
