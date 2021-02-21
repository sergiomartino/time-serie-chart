import React, { useCallback, useMemo } from "react";
import Select from "react-select";
import { PriceTypes } from '../services/TradingService';

const priceTypeOptions = [
    { label: "Open Prices", value: PriceTypes.OPEN  },
    { label: "High Prices", value: PriceTypes.HIGH },
    { label: "Low Prices", value: PriceTypes.LOW },
    { label: "Close Prices", value: PriceTypes.CLOSE },
];

export function PriceTypeSelector({ setPriceType, priceType }) {
    const onOptionSelection = useCallback((option) => setPriceType(option.value), [setPriceType]);
    const selectedOption = useMemo(() => priceTypeOptions.find(option => option.value === priceType), [priceType]);

    return (
        <Select
            classNamePrefix="price-type-select" 
            placeholder="Select price type"
            onChange={onOptionSelection}
            value={selectedOption}
            options={priceTypeOptions}
        />
    );
}
