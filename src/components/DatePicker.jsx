import React from "react";
import { formatDate } from '../services/FormattingService';

export function DatePicker({ name, min, max, onChange }) {
    return (
        <input
            type="date"
            name={name}
            className="date-picker"
            min={formatDate(min)}
            max={formatDate(max)}
            onChange={onChange}
        />
    );
}
