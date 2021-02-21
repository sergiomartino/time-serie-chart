import { RequestMock } from "testcafe";

export const stocks = RequestMock()
    .onRequestTo(/stock\/symbol/)
    .respond(
        [
            {
                currency: "USD",
                description: "UAN POWER CORP",
                displaySymbol: "UPOW",
                figi: "BBG000BGHYF2",
                mic: "OTCM",
                symbol: "UPOW",
                type: "Common Stock",
            },
            {
                currency: "USD",
                description: "APPLE INC",
                displaySymbol: "AAPL",
                figi: "BBG000B9Y5X2",
                mic: "XNGS",
                symbol: "AAPL",
                type: "Common Stock",
            },
            {
                currency: "USD",
                description: "EXCO TECHNOLOGIES LTD",
                displaySymbol: "EXCOF",
                figi: "BBG000JHDDS8",
                mic: "OOTC",
                symbol: "EXCOF",
                type: "Common Stock",
            },
            {
                currency: "USD",
                description: "Some Other Stock",
                displaySymbol: "SOMEOTHER",
                figi: "BBG000JHDDS8",
                mic: "OOTC",
                symbol: "SOMEOTHER",
                type: "Common Stock",
            },
        ],
        200,
        { "access-control-allow-origin": "*" }
    );

export const error = (destination) =>
    RequestMock()
        .onRequestTo(destination)
        .respond(null, 500, { "access-control-allow-origin": "*" });

export const price = RequestMock()
    .onRequestTo(/stock\/candle/)
    .respond(
        {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: "ok",
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
        },
        200,
        { "access-control-allow-origin": "*" }
    );
