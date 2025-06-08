export const formatAmount = (value?: number | null): string => {
    if (typeof value !== 'number') return "0";
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const formatted = absValue.toLocaleString("en-US");

    return `${isNegative ? "-" : ""}$${formatted}`;
};