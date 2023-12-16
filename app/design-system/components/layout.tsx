import { Box } from "@/app/design-system/components/box";
import { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function Layout({ children }: PropsWithChildren) {
	const { styles } = useStyles(stylesheet);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Box padding="20px">{children}</Box>
			</ScrollView>
		</SafeAreaView>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.screenBackgroundColor,
	},
}));
