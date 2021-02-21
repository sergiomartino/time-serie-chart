import React, { useCallback, useMemo } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { getStockFullDisplayName, searchStocks } from "../services/TradingService";

const MAX_NUMBER_OF_STOCK_SELECTIONS = 3;

function getMaxStockSelectionWarning(selectedStocks) {
    return selectedStocks.length >= MAX_NUMBER_OF_STOCK_SELECTIONS
        ? `Cannot select more than ${MAX_NUMBER_OF_STOCK_SELECTIONS} stocks.`
        : null;
}

function mapStocksToSelectListOptions(stocks) {
    return stocks.map(({ symbol, displaySymbol, description}) => ({
        label: getStockFullDisplayName(displaySymbol, description),
        value: symbol,
    }));
}

function extractStockSymbolsFromSelectListOption(options) {
    return options.map((option) => option.value);
}

/**
 * By default, react-select uses the label to display the stock in the textfield however,
 * the label includes the full name of the company and it is only suitable for the dropdown (ant not the textfield) 
 * due to its large size. The component below, makes sure the textfield uses the symbol only.
 */
function MultiValue(props) {
    return <components.MultiValue {...props}>{props.data.value}</components.MultiValue>;
}

export function StockSelector({ stocks, selectedStocks, setSelectedStocks }) {
    const maxStocksWarning = useMemo(() => getMaxStockSelectionWarning(selectedStocks), [selectedStocks]);
    const loadOptions = useCallback(
        (search) => {
            if (maxStocksWarning) return Promise.resolve([]);
            return Promise.resolve(mapStocksToSelectListOptions(searchStocks(stocks, search)));
        },
        [stocks, maxStocksWarning]
    );

    const onOptionsSelection = useCallback(
        (options) => setSelectedStocks(extractStockSymbolsFromSelectListOption(options)),
        [setSelectedStocks]
    );

    const noOptionsMessage = useCallback(() => {
        if (maxStocksWarning) return maxStocksWarning;
        if (!selectedStocks.length) return "No stocks available yet.";
        return "No stocks found.";
    }, [selectedStocks, maxStocksWarning]);

    return (
        <AsyncSelect
            classNamePrefix="stock-multi-select" 
            isMulti
            placeholder="Type to search for a Stock"
            noOptionsMessage={noOptionsMessage}
            loadOptions={loadOptions}
            onChange={onOptionsSelection}
            components={{ MultiValue }}
        />
    );
}
