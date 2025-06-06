export function truncateText(text: string, maxLength: number) {
    if (typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}