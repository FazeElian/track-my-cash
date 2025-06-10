export const getCurrentMonth = async () => {
    // Get the current date
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth();

    const startDate = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59));

    return { startDate, endDate };
}

export const getLast6Months = async () => {
    const endDate = new Date(); // Today
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 6);
    
    return { startDate, endDate };
}

export const getLast6MonthsArray = () => {
    const result = [];
    const date = new Date();
    date.setDate(1);
    
    for (let i = 0; i < 6; i++) {
        result.unshift(date.toISOString().slice(0, 7));
        date.setMonth(date.getMonth() - 1);
    }

    return result;
}