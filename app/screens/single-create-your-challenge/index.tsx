import { ScreenHeader } from "@/app/components/screen-header";
import { Box } from "@/app/design-system/components/box";
import { Layout } from "@/app/design-system/components/layout";
import { Text } from "@/app/design-system/components/text";
import { formatHyphen } from "@/app/lib/format/alpha";
import { RootCreateYourChallengeScreen } from "@/app/navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  RootCreateYourChallengeScreen,
  "SingleCreateYourChallenge"
>;

export function SingleCreateYourChallengeScreen({ route: { params } }: Props) {
  console.log(params);

  return (
    <Layout>
      <ScreenHeader title={`Custom ${formatHyphen(params.type, "before")}`} />
      <Box flexDirection="row" flexWrap="wrap" marginVertical="20px">
        <Text>hello</Text>
      </Box>
    </Layout>
  );
}
