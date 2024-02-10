export default function bubble_sort(arr: number[]): void {
    let unsorted = true;
    while (unsorted) {
        let valueChanged = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                valueChanged = true;
            }
        }
        if (!valueChanged) {
            unsorted = false;
        }
    }
}
