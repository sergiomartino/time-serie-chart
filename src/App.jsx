import React, { useState } from "react";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { Toolbar } from "./components/Toolbar";
import { useStocks } from "./hooks/tradingHooks";
import { PriceTypes } from "./services/TradingService";
import { Chart } from "./components/Chart";

export default function App() {
    const [stocks, error] = useStocks();
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [priceType, setPriceType] = useState(PriceTypes.OPEN);
    const [dateRange, setDateRange] = useState({});

    if (error) return <Error message={error} className="app-error" />;
    if (!stocks.length) return <Loading className="app-loading" />;

    return (
        <main>
            <Toolbar
                {...{
                    stocks,
                    selectedStocks,
                    setSelectedStocks,
                    priceType,
                    setPriceType,
                    dateRange,
                    setDateRange,
                }}
            />
            <Chart {...{ selectedStocks, priceType, dateRange }} />
        </main>
    );
}
