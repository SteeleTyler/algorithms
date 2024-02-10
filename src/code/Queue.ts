type Node<T> = {
    value: T;
    next?: Node<T>;
};
export default class Queue<T> {
    public length: number;
    public head?: Node<T>;
    public tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;
        const newNode: Node<T> = { value: item };
        if (!this.tail) {
            this.tail = this.head = newNode;
            return;
        }
        this.tail.next = newNode;
        this.tail = newNode;
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        const returnNode = this.head;
        if (!this.head.next) {
            this.tail = undefined;
        }
        this.head = this.head?.next;

        this.length--;
        returnNode.next = undefined;

        return returnNode.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }

    printList() {
        let currentNode = this.head;
        let printString = "";
        for (let i = 0; i < this.length; i++) {
            printString +=
                (i > 0 ? " -> " : "") + "{{" + currentNode?.value + "}}";
            currentNode = currentNode?.next;
        }
        console.log(printString);
    }
}
