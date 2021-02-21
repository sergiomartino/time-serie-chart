import React from "react";

export function Error({ message, className }) {
    return (
        <p className={className}>
            Something has gone wrong: <strong>{message}</strong>
        </p>
    );
}
