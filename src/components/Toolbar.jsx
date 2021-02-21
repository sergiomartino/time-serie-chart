import React from "react";
import { StockSelector } from "./StockSelector";
import { PriceTypeSelector } from "./PriceTypeSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { ToolbarDataSelector } from "./ToolbarDataSelector";

const ToolbarStockSelector = ToolbarDataSelector(StockSelector, "stocks", "Stocks");
const ToolbarPriceTypeSelector = ToolbarDataSelector(PriceTypeSelector, "price-types", "Price Types");
const ToolbarDateRangeSelector = ToolbarDataSelector(DateRangeSelector, "date-range", "Date Range (from/to)");

export function Toolbar(props) {
    return (
        <div className="toolbar">
            <ToolbarStockSelector {...props} />
            <ToolbarPriceTypeSelector {...props} />
            <ToolbarDateRangeSelector {... props} />
        </div>
    );
}
