export const formatDueDate = (deadline: string) => {
    const dueDate = new Date(deadline)

    // End of the day
    dueDate.setHours(23, 59, 59, 999);
    const now = new Date();

    const msLeft = dueDate.getTime() - now.getTime();
    if (msLeft <= 0) return "Vencida";

    const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));

    if (days >= 60) {
        const months = Math.floor(days / 30);
        return `${months} mes${months > 1 ? 'es' : ''}`;
    }

    if (days >= 14) {
        const weeks = Math.floor(days / 7);
        return `${weeks} semana${weeks > 1 ? 's' : ''}`;
    }

    return `${days} día${days > 1 ? 's' : ''}`;
}