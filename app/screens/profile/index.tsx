import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const isSubscribed = false;

export function ProfileScreen() {
	const [count, setCount] = useState(0);
	const { styles } = useStyles(stylesheet);
	const { navigate, addListener } = useNavigation();

	useEffect(() => {
		const unsubscribe = addListener("focus", () => {
			if (isSubscribed === false && count % 10 === 0) {
				navigate("Premium");
			}
			setCount(count + 1);
		});
		return unsubscribe;
	}, [isSubscribed, count]);

	return (
		<Layout>
			<ScreenHeader title="Profile" back={false} />
			<Box paddingVertical="20px">
				<Text>
					Become a member to get access to all the features of the app.
				</Text>
			</Box>
			<Box>
				<Text level="heading">Most completed challenges:</Text>
				<Box>
					<Text>👟 Steps</Text>
					<Text>🪜 Flights</Text>
					<Text>🏋️‍♀️ Workouts</Text>
				</Box>
			</Box>
		</Layout>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {},
}));
