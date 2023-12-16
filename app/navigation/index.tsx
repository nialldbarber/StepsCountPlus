import { linking } from "@/app/navigation/deep-linking";
import { StackNavigator } from "@/app/navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export function RootNavigator() {
	return (
		<NavigationContainer linking={linking}>
			<StackNavigator />
		</NavigationContainer>
	);
}
