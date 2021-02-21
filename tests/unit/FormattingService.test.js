import {
    formatStringNumberWithDecimalPlaces,
    formatNumberWithZeroPrefix,
    formatDate,
} from "../../src/services/FormattingService";

describe("FormattingService", () => {
    describe("formatStringNumberWithDecimalPlaces", () => {
        test("It should format a string number with an arbitrary number of decimal places", () => {
            expect(formatStringNumberWithDecimalPlaces("")).toBe("");
            expect(formatStringNumberWithDecimalPlaces()).toBe("");
            expect(formatStringNumberWithDecimalPlaces(null)).toBe("");
            expect(formatStringNumberWithDecimalPlaces("0")).toBe("0.00");
            expect(formatStringNumberWithDecimalPlaces("123")).toBe("123.00");
            expect(formatStringNumberWithDecimalPlaces("123.4")).toBe("123.40");
            expect(formatStringNumberWithDecimalPlaces("123.62")).toBe("123.62");
            expect(formatStringNumberWithDecimalPlaces("123.623")).toBe("123.62");
            expect(formatStringNumberWithDecimalPlaces("123", 4)).toBe("123.0000");
            expect(formatStringNumberWithDecimalPlaces("123.45", 3)).toBe("123.450");
            expect(formatStringNumberWithDecimalPlaces("123.6245", 5)).toBe("123.62450");
            expect(formatStringNumberWithDecimalPlaces("123.6245", 3)).toBe("123.624");
        });
    });

    describe("formatNumberWithZeroPrefix", () => {
        test("It should format a number with a zero prefix", () => {
            expect(formatNumberWithZeroPrefix()).toBe("00");
            expect(formatNumberWithZeroPrefix(null)).toBe("00");
            expect(formatNumberWithZeroPrefix(0)).toBe("00");
            expect(formatNumberWithZeroPrefix(3)).toBe("03");
            expect(formatNumberWithZeroPrefix(10)).toBe("10");
            expect(formatNumberWithZeroPrefix(100)).toBe("100");
        });
    });

    describe("formatDate", () => {
        test("It should format an epoch date in a year-month-day format", () => {
            expect(formatDate()).toMatch(/\d{4}-[0|1]\d-[0-3]\d/);
            expect(formatDate(new Date(2020, 10, 15).getTime())).toBe('2020-11-15');
            expect(formatDate(new Date(2010, 3, 1).getTime())).toBe('2010-04-01');
        });
    });
});
