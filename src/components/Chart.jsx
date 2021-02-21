import React, { useMemo } from "react";
import { Chart as ReactChart } from "react-charts";
import { Loading } from "./Loading";
import { formatStringNumberWithDecimalPlaces } from "../services/FormattingService";
import { usePricedStocks } from "../hooks/tradingHooks";
import { Error } from "./Error";

const axes = [
    { primary: true, type: "time", position: "bottom", showPoints: true },
    { type: "linear", position: "right", showPoints: true, format: formatStringNumberWithDecimalPlaces },
];

export function Chart({ selectedStocks, priceType, dateRange }) {
    const { from, to } = dateRange;
    const [pricedStocks, error] = usePricedStocks(selectedStocks, from, to);
    const data = useMemo(() => {
        return pricedStocks.map((pricedStock) => {
            const [stock, price] = pricedStock;
            return {
                label: stock,
                data: price.t.map((timestamp, index) => {
                    return {
                        primary: timestamp * 1000,
                        secondary: price[priceType][index],
                    };
                }),
            };
        });
    }, [pricedStocks, priceType]);

    if (error) return <Error message={error} className="pricing-error" />;
    if (!selectedStocks.length || !from || !to) return null;
    if (!pricedStocks.length) return <Loading />;

    return (
        <div className="stock-chart">
            <ReactChart data={data} axes={axes} tooltip />
        </div>
    );
}
