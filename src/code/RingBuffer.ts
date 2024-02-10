export default class RingBuffer<T> {
    public length: number;
    private internalLength: number;
    private lengthMultiplier: number;
    private head: number;
    private tail: number;
    private buffer: T[];

    constructor() {
        this.length = 0;
        this.internalLength = 5;
        this.lengthMultiplier = 1.5;
        this.head = 2;
        this.tail = 2;
        this.buffer = new Array<T>(this.internalLength);
    }

    push(item: T): void {
        if (this.tail >= this.internalLength - 1) {
            this.getNewArray();
        }
        if (this.buffer[this.tail] !== undefined) {
            this.tail++;
        }
        this.buffer[this.tail] = item;
        this.length++;
    }
    get(idx: number): T | undefined {
        return this.head + idx <= this.internalLength
            ? this.buffer[this.head + idx]
            : undefined;
    }
    pop(): T | undefined {
        const returnItem = this.buffer[this.head];
        delete this.buffer[this.head];
        this.head = Math.min(this.tail, this.head + 1);
        this.length = Math.max(0, this.length - 1);
        return returnItem;
    }
    private getNewArray() {
        const newLength = Math.floor(
            this.internalLength * this.lengthMultiplier,
        );
        const newHead = Math.floor(newLength / 2 - this.length / 2);
        const newBuffer = new Array(Math.ceil(newLength));
        for (let i = this.head; i < this.head + this.length; i++) {
            newBuffer[newHead + (i - this.head)] = this.buffer[i];
        }
        this.head = newHead;
        this.tail = this.head + this.length;
        this.internalLength = newLength;
        this.buffer = newBuffer;
    }

    private printInfo() {
        console.log("/==================");
        console.log(this.buffer);
        console.log("length: ", this.length);
        console.log("internalLength: ", this.internalLength);
        console.log("head: ", this.head);
        console.log("tail: ", this.tail);
        console.log("==================/");
    }
}
