import secrets from "../../secrets.json";
import config from "../../config.json";
import { request } from "./Network";

export function requestStocks(exchange) {
    return request(`${config.api}stock/symbol?exchange=${exchange}&token=${secrets.apiToken}`)
        .then((response) => response.json())
        .then((response) => {
            if (response.error) return Promise.reject();
            return response;
        })
        .catch(() => Promise.reject("Could not get stocks."));
}

export function requestPrices(stocks, from, to) {
    return Promise.all(stocks.map((stock) => requestPrice(stock, from, to))).then((prices) => {
        return prices.map((price, index) => [stocks[index], price]);
    });
}

function requestPrice(stock, from, to) {
    return request(
        `${config.api}stock/candle?symbol=${stock}&resolution=D&from=${from / 1000}&to=${
            to / 1000
        }&token=${secrets.apiToken}`
    )
        .then((response) => response.json())
        .then((response) => {
            if (response.s === "ok") return response;
            return Promise.reject();
        })
        .catch(() => Promise.reject("Could not get pricing."));
}
