import { useEffect, useState } from "react";
import { requestStocks, requestPrices } from "../services/EndpointService";
import { exchange } from "../../config.json";

export function useStocks() {
    const [{ stocks, error }, setStocks] = useState({ stocks: [], error: null });

    useEffect(() => {
        requestStocks(exchange)
            .then(stocks => setStocks( { stocks, error: null }))
            .catch(error => setStocks( { stocks: [], error }));
    }, []);

    return [stocks, error];
}

export function usePricedStocks(stocks, from, to) {
    const [{ pricedStocks, error }, setPricedStocks] = useState({ pricedStocks: [], error: null });

    useEffect(() => {
        if (stocks.length && from && to) {
            requestPrices(stocks, from, to)
                .then(pricedStocks => setPricedStocks({ pricedStocks, error: null }))
                .catch(error => setPricedStocks({ pricedStocks: [], error }));
        }
    }, [stocks, from, to]);

    return [pricedStocks, error];
}
