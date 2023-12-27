import { NavigationContainer } from "@react-navigation/native";
import { RenderOptions, render } from "@testing-library/react-native";
import React, { PropsWithChildren } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {}

export function renderWithNavigation(
	ui: React.ReactElement,
	renderOptions: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <NavigationContainer>{children}</NavigationContainer>;
	}

	// Return all of RTL's query functions
	return render(ui, { wrapper: Wrapper, ...renderOptions });
}
