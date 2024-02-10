export default class MinHeap {
    public length: number;
    private data: number[];
    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const deletedValue = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return deletedValue;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return deletedValue;
    }

    private heapifyDown(index: number): void {
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);
        if (index >= this.length || leftChildIndex >= this.length) {
            return;
        }

        const [value, leftValue, rightValue] = [
            this.data[index],
            this.data[leftChildIndex],
            this.data[rightChildIndex],
        ];

        if (leftValue > rightValue && value > rightValue) {
            [this.data[index], this.data[rightChildIndex]] = [
                rightValue,
                value,
            ];
            this.heapifyDown(rightChildIndex);
        } else if (rightValue > leftValue && value > leftValue) {
            [this.data[index], this.data[leftChildIndex]] = [leftValue, value];
            this.heapifyDown(leftChildIndex);
        }
    }

    private heapifyUp(index: number): void {
        if (index === 0) {
            return;
        }
        const parentIndex = this.getParentIndex(index);
        const parentValue = this.data[parentIndex];
        const value = this.data[index];
        if (parentValue > value) {
            [this.data[index], this.data[parentIndex]] = [
                this.data[parentIndex],
                this.data[index],
            ];
            this.heapifyUp(parentIndex);
        }
    }

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return index * 2 + 1;
    }

    private getRightChildIndex(index: number): number {
        return index * 2 + 2;
    }
}
