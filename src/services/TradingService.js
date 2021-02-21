import { truncate } from "lodash";

export const PriceTypes = {
    OPEN: "o",
    HIGH: "h",
    LOW: "l",
    CLOSE: "c",
};

export function getStockFullDisplayName(symbol, description) {
    return `${symbol} (${truncate(description)})`;
}

export function searchStocks(stocks, search, limit = 50) {
    search = search.toLowerCase();
    return stocks
        .filter(
            (stock) =>
                stock.symbol.toLowerCase().startsWith(search) ||
                stock.description.toLowerCase().startsWith(search)
        )
        .slice(0, limit);
}