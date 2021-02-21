import { getStockFullDisplayName, searchStocks, formatChartPrice } from "../../src/services/TradingService";

describe("TradingService", () => {
    describe("getStockFullDisplayName", () => {
        test("It should format a stock name, using its symbol and a description", () => {
            expect(getStockFullDisplayName("ABC", "Some description")).toBe(
                "ABC (Some description)"
            );
        });

        test("It should truncate the description, if it is too long", () => {
            expect(
                getStockFullDisplayName(
                    "ABC",
                    "Some very long description that should really be truncated"
                )
            ).toBe("ABC (Some very long description ...)");
        });
    });

    describe("searchStocks", () => {
        test("It should search a stock within a list, by matching symbol or description", () => {
            const stocks = [
                { symbol: "ABC", description: "Some stock" },
                { symbol: "DEF", description: "Other stock" },
                { symbol: "GHI", description: "Some More stock" },
                { symbol: "DEG", description: "Definitely a company here" },
            ];

            expect(searchStocks(stocks, "other")).toEqual([stocks[1]]);
            expect(searchStocks(stocks, "Some")).toEqual([stocks[0], stocks[2]]);
            expect(searchStocks(stocks, "ghi")).toEqual([stocks[2]]);
            expect(searchStocks(stocks, "DE")).toEqual([stocks[1], stocks[3]]);
            expect(searchStocks(stocks, "")).toEqual(stocks);
        });

        test('It should limit the search results to a specified count', () => {
            const stocks = Array.from({ length: 60 }, () => ({ symbol: 'ABC',  description: '' }));
            expect(searchStocks(stocks, "ABC")).toHaveLength(50);
            expect(searchStocks(stocks, "ABC", 20)).toHaveLength(20);
        });
    });
});
