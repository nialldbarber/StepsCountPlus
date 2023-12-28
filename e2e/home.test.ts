import { by, device, element, expect } from "detox";

describe("Test suite 1", () => {
	beforeAll(async () => {
		await device.reloadReactNative();
	});

	it("should show hello screen after tap", async () => {
		await expect(element(by.text("Stats!"))).toBeVisible();
	});
});
