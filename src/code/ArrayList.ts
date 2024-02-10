export default class ArrayList<T> {
    public length: number;
    public max: number;
    private maxMultiplier: number;
    private array: Array<T>;
    constructor(initialMax: number) {
        this.length = 0;
        this.max = initialMax;
        this.maxMultiplier = 2;
        this.array = new Array(this.max);
    }

    prepend(item: T): void {
        if (this.length === 0) {
            this.handleFirstItem(item);
            return;
        }
        const newArray = this.getNewArray();
        newArray[0] = item;
        for (let i = 0; i < this.length; i++) {
            newArray[i + 1] = this.array[i];
        }
        this.array = newArray;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        const newArray = this.getNewArray();
        for (let i = 0; i < idx; i++) {
            newArray[i] = this.array[i];
        }
        newArray[idx] = item;
        for (let i = idx + 1; i < this.length + 1; i++) {
            newArray[i] = this.array[i - 1];
        }
        this.length++;
    }
    append(item: T): void {
        if (this.length === 0) {
            this.handleFirstItem(item);
            return;
        }
        if (this.length + 1 > this.max) {
            this.max *= this.maxMultiplier;
            const newArray = new Array(this.max);
            for (let i = 0; i < this.length; i++) {
                newArray[i] = this.array[i];
            }
            newArray[this.length] = item;
            this.array = newArray;
        } else {
            this.array[this.length] = item;
        }
        this.length++;
    }
    remove(item: T): T | undefined {
        let itemFound = false;
        for (let i = 0; i < this.length; i++) {
            if (itemFound) {
                this.array[i - 1] = this.array[i];
            }
            if (this.array[i] === item) {
                itemFound = true;
            }
        }
        if (itemFound) {
            this.length--;
            return item;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        const removedItem = this.array[idx];

        for (let i = idx; i < this.length; i++) {
            this.array[i] = this.array[i + 1];
        }

        this.length--;
        return removedItem;
    }

    private getNewArray() {
        if (this.length + 1 > this.max) {
            this.max *= this.maxMultiplier;
        }
        return new Array(this.max);
    }

    private handleFirstItem(item: T) {
        this.array[0] = item;
        this.length++;
    }
}
