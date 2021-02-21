import React, { useCallback, useEffect, useState } from "react";
import { DatePicker } from './DatePicker';

const YEAR_MS = 1000 * 60 * 60 * 24 * 365; // approximate value

export function DateRangeSelector({ dateRange, setDateRange }) {
    const [{ fromMin, fromMax, toMin, toMax }, setBoundaries] = useState({});
    const { from, to } = dateRange;

    const onChange = useCallback(
        (ev) => {
            const epoch = Date.parse(ev.currentTarget.value);
            const isFrom = ev.currentTarget.name === "date-from";
            setDateRange({ from: isFrom ? epoch : from, to: isFrom ? to : epoch });
        },
        [from, to]
    );

    useEffect(() => {
        setBoundaries({
            fromMin: to - YEAR_MS,
            fromMax: to,
            toMin: Math.min(from, to ?? Date.now()),
            toMax: to ? Math.min(to, Date.now()) : Date.now(),
        });
    }, [from, to]);

    return (
        <>
            <DatePicker
                name="date-from"
                min={fromMin}
                max={fromMax}
                onChange={onChange}
            />
            <DatePicker
                name="date-to"
                min={toMin}
                max={toMax}
                onChange={onChange}
            />
        </>
    );
}
