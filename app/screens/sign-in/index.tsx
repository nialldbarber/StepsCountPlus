import { Box } from "@/app/design-system/components/box";
import { Button } from "@/app/design-system/components/button";
import { Input } from "@/app/design-system/components/input";
import { Layout } from "@/app/design-system/components/layout";
import { Spacer } from "@/app/design-system/components/spacer";
import { Text } from "@/app/design-system/components/text";
import { VStack } from "@/app/design-system/components/v-stack";
import { useBottomSheet } from "@/app/hooks/useBottomSheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { z } from "zod";

const SignInSchema = z.object({
	email: z.string(),
	password: z.string(),
});
type SignIn = z.infer<typeof SignInSchema>;

export function SignInScreen() {
	const { styles, theme } = useStyles(stylesheet);
	const bottomSheetRef = useRef(null);
	const { handlePresentModalPress, handleCloseModal } =
		useBottomSheet(bottomSheetRef);
	const { navigate } = useNavigation();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<SignIn>({
		resolver: zodResolver(SignInSchema),
	});

	async function handleSignIn({
		email,
		password,
	}: { email: string; password: string }) {
		console.log({ email, password });

		// const { error } = await supabase.auth.signInWithPassword({
		// 	email,
		// 	password,
		// });

		// if (error) {
		// 	Alert.alert(error.message);
		// }
	}

	return (
		<>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={["50%", "50%"]}
				backdropComponent={BottomSheetBackdrop}
				backgroundStyle={{
					backgroundColor: theme.colors.modalBackgroundColor,
				}}
			>
				<Layout>
					<VStack gutter="10px">
						<Text level="heading" size="30px" textStyles={styles.text}>
							Log in
						</Text>
						<Spacer verticalSpace="15px" />
						<Controller
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input
									value={value || ""}
									placeholder="Email..."
									onChangeText={(text) => onChange(text)}
									keyboardType="email-address"
									autoCapitalize="none"
									showClear={false}
									isError={errors.email}
									errorMessage={errors.email?.message}
								/>
							)}
							name="email"
						/>
						<Controller
							control={control}
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<Input
									value={value || ""}
									placeholder="Password..."
									onChangeText={(text) => onChange(text)}
									secureTextEntry
									autoCapitalize="none"
									showClear={false}
									isError={errors.password}
									errorMessage={errors.password?.message}
								/>
							)}
							name="password"
						/>
						<Spacer verticalSpace="10px" />
						<Button onPress={handleSubmit(handleSignIn)}>Log in</Button>
					</VStack>
				</Layout>
			</BottomSheetModal>

			<Layout>
				<Box justifyContent="space-between" alignItems="center" height="full">
					<Text level="heading" size="44px">
						StepsCount++
					</Text>
					<VStack gutter="12px" width="full">
						<Text size="18px" textStyles={styles.text}>
							Already a user?
						</Text>
						<Button onPress={handlePresentModalPress}>Log in</Button>
						<Box flexDirection="row" justifyContent="space-between">
							<Button variant="secondary" buttonStyles={styles.button}>
								Google
							</Button>
							<Button variant="secondary" buttonStyles={styles.button}>
								Apple
							</Button>
						</Box>
						<Box
							flexDirection="row"
							alignItems="center"
							justifyContent="center"
						>
							<Box width="1/3" height="1px" backgroundColor="white" />
							<Box marginHorizontal="10px">
								<Text size="18px">or</Text>
							</Box>
							<Box width="1/3" height="1px" backgroundColor="white" />
						</Box>
						<Button
							variant="tertiary"
							onPress={() => navigate("CreateAccount")}
						>
							Create an account
						</Button>
					</VStack>
				</Box>
			</Layout>
		</>
	);
}

const stylesheet = createStyleSheet(() => ({
	button: {
		minWidth: 180,
	},
	text: {
		alignSelf: "center",
	},
}));
