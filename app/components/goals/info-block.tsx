import { hitSlopLarge } from "@/app/constants/hit-slop";
import { Box } from "@/app/design-system/components/box";
import { Pressable } from "@/app/design-system/components/pressable";
import { Stack } from "@/app/design-system/components/stack";
import { Text } from "@/app/design-system/components/text";
import { Link } from "iconsax-react-native";
import { Linking } from "react-native";

type InfoBlockProps = {
	title: string;
	infoBlock: string;
	link: string;
};

export function InfoBlock({ title, infoBlock, link }: InfoBlockProps) {
	return (
		<Stack gutter="5px">
			<Box flexDirection="row" alignItems="center">
				<Pressable hitSlop={hitSlopLarge} onPress={() => Linking.openURL(link)}>
					<Link color="dodgerblue" size={16} />
				</Pressable>
				<Box paddingLeft="10px">
					<Text textStyles={{ lineHeight: 25 }}>{title}: </Text>
				</Box>
			</Box>
			<Text weight="medium" size="14px">
				{infoBlock}
			</Text>
		</Stack>
	);
}
