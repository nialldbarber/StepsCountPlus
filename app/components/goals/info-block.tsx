import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Pressable } from "@/app/core/pressable";
import { colors } from "@/app/design-system/colors";
import { Box } from "@/app/design-system/components/box";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { Link } from "iconsax-react-native";
import { Linking } from "react-native";

type InfoBlockProps = {
	title: string;
	infoBlock: string;
	link: string;
};

export function InfoBlock({ title, infoBlock, link }: InfoBlockProps) {
	return (
		<VStack gutter="5px">
			<Box flexDirection="row" alignItems="center">
				<Pressable hitSlop={hitSlopLarge} onPress={() => Linking.openURL(link)}>
					<Link color={colors.primary} size={16} />
				</Pressable>
				<Box paddingLeft="10px">
					<Text textStyles={{ lineHeight: 25 }}>{title}: </Text>
				</Box>
			</Box>
			<Text weight="medium" size="14px">
				{infoBlock}
			</Text>
		</VStack>
	);
}
