import { readableDate } from "./dates";

describe("readableDate", () => {
	it("should correctly format a date in January", () => {
		expect(readableDate("2022-01-01T00:00:00Z")).toBe("1st January 2022");
	});

	it("should correctly format a date in February", () => {
		expect(readableDate("2022-02-14T00:00:00Z")).toBe("14th February 2022");
	});

	it("should correctly format a date in March", () => {
		expect(readableDate("2022-03-31T00:00:00Z")).toBe("31st March 2022");
	});
});
