import React from "react";
import renderer from "react-test-renderer";
import { Chart } from "../../src/components/Chart";
import { PriceTypes } from "../../src/services/TradingService";
import { usePricedStocks } from "../../src/hooks/tradingHooks";

jest.mock("../../src/hooks/tradingHooks", () => ({
    _esModule: true,
    usePricedStocks: jest.fn(),
}));

function getPrice(delta) {
    return {
        c: [200 + delta, 221 + delta, 219 + delta],
        h: [222 + delta, 222 + delta, 220 + delta],
        l: [217 + delta, 217 + delta, 218 + delta],
        o: [221 + delta, 218 + delta, 220 + delta],
        s: "ok",
        t: [
            new Date(2021, 1, 12).getTime(),
            new Date(2021, 1, 15).getTime(),
            new Date(2021, 1, 20).getTime(),
        ],
    };
}

describe("Chart", () => {
    const dateRange = {
        from: new Date(2021, 1, 10).getTime(),
        to: new Date(2021, 1, 20).getTime(),
    };

    beforeEach(() => {
        usePricedStocks.mockImplementation((stocks) => {
            return [
                stocks.map((stock, index) => {
                    const delta = index + 50;
                    return [stock, getPrice(delta)];
                }),
                null,
            ];
        });
    });

    test("It should render a chart line for 1 stock with open price type and within a date range", () => {
        const tree = renderer
            .create(
                <Chart
                    selectedStocks={["AAPL"]}
                    priceType={PriceTypes.OPEN}
                    dateRange={dateRange}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("It should render a chart line for each stocks with close price type and within a date range", () => {
        const tree = renderer
            .create(
                <Chart
                    selectedStocks={["AAPL", "TSLA"]}
                    priceType={PriceTypes.CLOSE}
                    dateRange={dateRange}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("When priced stocks are not available, it should render an error", () => {
        usePricedStocks.mockImplementation(() => [[], "Error!"]);
        const tree = renderer
            .create(
                <Chart
                    selectedStocks={["AAPL"]}
                    priceType={PriceTypes.CLOSE}
                    dateRange={dateRange}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
