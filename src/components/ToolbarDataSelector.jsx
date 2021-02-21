import React from "react";

export function ToolbarDataSelector(DataSelector, className, label) {
    return (props) => (
        <fieldset className={`toolbar-data-selector ${className}`}>
            <label>{label}</label>
            <div className="data-selector">
                <DataSelector {...props} />
            </div>
        </fieldset>
    );
}
