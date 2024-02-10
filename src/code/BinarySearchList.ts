export default function bs_list(haystack: number[], needle: number): boolean {
    return search(haystack, 0, haystack.length - 1, needle);
}

function search(
    array: number[],
    low: number,
    high: number,
    target: number,
): boolean {
    if (low > high) {
        return false;
    }
    const midPoint = low + Math.floor((high - low) / 2);

    if (target === array[midPoint]) {
        return true;
    }
    if (target < array[midPoint]) {
        return search(array, low, midPoint - 1, target);
    }
    return search(array, midPoint + 1, high, target);
}
