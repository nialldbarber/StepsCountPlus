import { render, screen } from "@testing-library/react-native";
import React from "react";
import App from "./App";

describe("App", () => {
	test("app renders message", () => {
		render(<App />);
		const text = screen.getByText(/hello/i);
		expect(text).toBeTruthy();
	});
});
