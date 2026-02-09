/**
 * Truncates a string from both ends, keeping specified portions from start and end
 * @param str - The string to truncate
 * @param start - Number of characters to keep from the start (default: 6)
 * @param end - Number of characters to keep from the end (default: 6)
 * @returns Truncated string with "..." in the middle, or original if too short
 * @example
 * truncateString("0x1234567890abcdef", 6, 4) // "0x1234....cdef"
 */
export const truncateString = (str: string, start = 6, end = 6): string => {
    if (!str) return '';
    if (str.length <= start + end) {
        return str;
    }
    return str.slice(0, start) + '....' + str.slice(str.length - end);
};
