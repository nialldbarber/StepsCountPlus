import type { RootCreateYourChallengeScreen } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { CreateYourChallengeScreen } from "@/app/screens/create-your-challenge";
import { SingleCreateYourChallengeScreen } from "@/app/screens/single-create-your-challenge";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootCreateYourChallengeScreen>();

export function CreateYourChallengeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateYourChallengeRoot"
        component={CreateYourChallengeScreen}
        options={options}
      />
      <Stack.Screen
        name="SingleCreateYourChallenge"
        component={SingleCreateYourChallengeScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}
