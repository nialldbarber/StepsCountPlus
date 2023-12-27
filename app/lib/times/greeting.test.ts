import { timeBasedGreeting } from "./greeting";

describe("timeBasedGreeting", () => {
	test('should return "Good morning" if the hour is less than 12', () => {
		jest.spyOn(global, "Date").mockImplementationOnce(
			() =>
				({
					getHours: () => 10,
				}) as any,
		);
		expect(timeBasedGreeting()).toBe("Good morning");
	});

	test('should return "Good afternoon" if the hour is less than 18 and greater than or equal to 12', () => {
		jest.spyOn(global, "Date").mockImplementationOnce(
			() =>
				({
					getHours: () => 15,
				}) as any,
		);
		expect(timeBasedGreeting()).toBe("Good afternoon");
	});

	test('should return "Good evening" if the hour is greater than or equal to 18', () => {
		jest.spyOn(global, "Date").mockImplementationOnce(
			() =>
				({
					getHours: () => 20,
				}) as any,
		);
		expect(timeBasedGreeting()).toBe("Good evening");
	});
});
