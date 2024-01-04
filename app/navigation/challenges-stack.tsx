import { CreateYourChallengeStack } from "@/app/navigation/create-your-challenge-stack";
import type { RootChallengesScreen } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { ChallengesScreen } from "@/app/screens/challenges";
import { CurrentChallengeScreen } from "@/app/screens/current-challenge";
import { SelectChallengeScreen } from "@/app/screens/select-challenge";
import { SingleChallengeScreen } from "@/app/screens/single-challenge";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootChallengesScreen>();

export function ChallengeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChallengesRoot"
        component={ChallengesScreen}
        options={options}
      />
      <Stack.Screen
        name="SelectChallenge"
        component={SelectChallengeScreen}
        options={options}
      />
      <Stack.Screen
        name="SingleChallenge"
        component={SingleChallengeScreen}
        options={options}
      />
      <Stack.Screen
        name="CurrentChallenge"
        component={CurrentChallengeScreen}
        options={options}
      />
      <Stack.Screen
        name="CreateYourChallenge"
        component={CreateYourChallengeStack}
        options={options}
      />
    </Stack.Navigator>
  );
}
