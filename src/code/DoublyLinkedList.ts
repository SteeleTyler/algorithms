type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode: Node<T> = { value: item, next: this.head };
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        const currentNode = this.getNodeAtIndex(idx);
        if (currentNode) {
            const newNode: Node<T> = {
                value: item,
                next: currentNode?.next,
                prev: currentNode,
            };
            if (currentNode.next) {
                currentNode.next.prev = newNode;
            } else {
                this.tail = newNode;
            }
            currentNode.next = newNode;
        } else {
            console.error(
                "Cannot insert at index ",
                idx,
                ". It exceeds the list length",
            );
        }
    }
    append(item: T): void {
        const newNode: Node<T> = { value: item };
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
            }
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
    remove(item: T): T | undefined {
        if (!this.head) {
            return undefined;
        }
        if (this.head.value === item) {
            const returnValue = this.head.value;
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = undefined;
            }
            this.length--;
            return returnValue;
        }
        let previousNode = this.head;
        let currentNode = this.head?.next;
        while (currentNode?.value !== item && currentNode?.next) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        if (currentNode?.value === item) {
            previousNode.next = currentNode.next;
            if (currentNode.next) {
                currentNode.next.prev = previousNode;
            }
            this.length = Math.max(0, this.length - 1);
            return item;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        return this.getNodeAtIndex(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            const removeValue = this.head?.value;
            if (this.length === 1) {
                this.head = this.tail = undefined;
            } else {
                this.head = this.head?.next;
            }
            this.length--;
            return removeValue;
        }
        const previousNode = this.getNodeAtIndex(idx - 1);
        if (previousNode && previousNode.next) {
            const removeValue = previousNode.next.value;
            if (previousNode.next?.next) {
                previousNode.next.next.prev = previousNode;
            }
            previousNode.next = previousNode.next.next;
            this.length--;
            return removeValue;
        }
        return undefined;
    }

    private getNodeAtIndex(idx: number) {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        if (idx <= this.length / 2) {
            let currentNode = this.head;
            for (let i = 0; i < idx; i++) {
                currentNode = currentNode?.next;
            }
            return currentNode;
        }
        let currentNode = this.tail;
        for (let i = this.length - 1; i > idx; i--) {
            currentNode = currentNode?.prev;
        }
        return currentNode;
    }

    private printList() {
        console.log("Length: ", this.length);
        let currentNode = this.head;
        while (currentNode) {
            console.log("  -(", currentNode.value, ")");
            currentNode = currentNode.next;
        }
        console.log("  -----");
    }
}
