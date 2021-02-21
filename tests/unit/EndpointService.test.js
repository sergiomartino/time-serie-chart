import { requestPrices, requestStocks } from "../../src/services/EndpointService";
import { request } from "../../src/services/Network";

jest.mock("../../src/services/Network", () => ({
    _esModule: true,
    request: jest.fn(),
}));

describe("EndpointService", () => {
    const month_ms = 1000 * 60 * 60 * 24 * 30;
    const to = Date.now();
    const from = to - month_ms;
    const stockSymbols = ["ABC", "DEF", "FGH"];

    afterEach(() => {
        request.mockRestore();
    });

    describe("requestStocks", () => {
        test("it should provide a list of stocks", () => {
            expect.assertions(1);

            const stocks = [
                {
                    currency: "USD",
                    description: "UAN POWER CORP",
                    displaySymbol: "UPOW",
                    figi: "BBG000BGHYF2",
                    mic: "OTCM",
                    symbol: "UPOW",
                    type: "Common Stock",
                },
            ];

            request.mockResolvedValueOnce({
                json: () => stocks,
            });

            return requestStocks().then((requestedStocks) => {
                expect(requestedStocks).toEqual(stocks);
            });
        });

        test('it should provide an error, if the request fails', () => {
            request.mockRejectedValueOnce();
            return requestStocks().catch(error => {
                expect(error).toBeDefined();
            });
        });

        test('it should provide an error, if the request is not valid', () => {
            request.mockResolvedValueOnce({
                json: () => ({ error: 'You need an api token!' })
            });

            return requestStocks().catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe("requestPrices", () => {
        test("It should provide prices for a list of stocks", () => {
            expect.assertions(3);

            request.mockResolvedValueOnce({ json: () => ({ price: 0, s: "ok" }) });
            request.mockResolvedValueOnce({ json: () => ({ price: 1, s: "ok" }) });
            request.mockResolvedValueOnce({ json: () => ({ price: 2, s: "ok" }) });

            return requestPrices(stockSymbols, from, to).then((prices) => {
                expect(prices[0]).toEqual(["ABC", { price: 0, s: "ok" }]);
                expect(prices[1]).toEqual(["DEF", { price: 1, s: "ok" }]);
                expect(prices[2]).toEqual(["FGH", { price: 2, s: "ok" }]);
            });
        });

        test("It should handle unavailable pricing failures", () => {
            expect.assertions(1);

            request.mockResolvedValue({ json: () => ({ s: "no_data" }) });
            return requestPrices(stockSymbols, from, to).catch((error) => {
                expect(error).toBeDefined();
            });
        });
    });
});
