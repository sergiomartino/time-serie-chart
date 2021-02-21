export function formatStringNumberWithDecimalPlaces(number = "", decimals = 2) {
    number = parseFloat(number);
    return !Number.isNaN(number) ? number.toFixed(decimals) : "";
}

export function formatNumberWithZeroPrefix(num = 0) {
    num = num === null ? 0 : num;
    return num < 10 ? `0${num}` : `${num}`;
}

export function formatDate(epoch = Date.now()) {
    const date = new Date(epoch);
    const year = date.getFullYear();
    const month = formatNumberWithZeroPrefix(date.getMonth() + 1);
    const day = formatNumberWithZeroPrefix(date.getDate());

    return `${year}-${month}-${day}`;
}
