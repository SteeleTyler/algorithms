type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        const newNode: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = newNode;
            return;
        }
        newNode.prev = this.head;
        this.head = newNode;
    }
    pop(): T | undefined {
        const returnNode = this.head;
        if (returnNode) {
            this.length--;
            this.head = returnNode.prev;
        }
        return returnNode?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
