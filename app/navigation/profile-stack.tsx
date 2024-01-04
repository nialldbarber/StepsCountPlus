import type { RootProfileScreen } from "@/app/navigation/types";
import { options } from "@/app/navigation/utils";
import { PremiumModalScreen } from "@/app/screens/premium";
import { ProfileScreen } from "@/app/screens/profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootProfileScreen>();

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileRoot">
      <Stack.Group>
        <Stack.Screen
          name="ProfileRoot"
          component={ProfileScreen}
          options={options}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Premium"
          component={PremiumModalScreen}
          options={options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
