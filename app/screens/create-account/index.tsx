import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { useNavigation } from "@react-navigation/native";

export function CreateAccountScreen() {
	const { goBack } = useNavigation();

	return (
		<Layout>
			<Box justifyContent="space-between" alignItems="center" height="full">
				<Text level="heading" size="44px">
					StepsCount++
				</Text>
			</Box>
		</Layout>
	);
}
