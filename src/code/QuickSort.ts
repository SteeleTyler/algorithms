export default function quick_sort(array: number[]): void {
    sort_quickly(array, 0, array.length - 1);
}

function partition(array: number[], low: number, high: number): number {
    const pivot = array[high];
    let index = low - 1;
    for (let i = low; i < high; i++) {
        if (array[i] <= pivot) {
            index++;
            [array[i], array[index]] = [array[index], array[i]];
        }
    }
    index++;
    [array[high], array[index]] = [array[index], pivot];
    return index;
}

function sort_quickly(array: number[], low: number, high: number) {
    if (low >= high) {
        return;
    }
    const pivotIndex = partition(array, low, high);
    sort_quickly(array, low, pivotIndex - 1);
    sort_quickly(array, pivotIndex + 1, high);
}
