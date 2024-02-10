type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode: Node<T> = { value: item, next: this.head };
        this.head = newNode;
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        const currentNode = this.getNodeAtIndex(idx);
        if (currentNode) {
            const newNode: Node<T> = { value: item, next: currentNode?.next };
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
        } else {
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
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
            if (this.head) {
                this.head = this.head.next;
                this.length--;
            }
            return removeValue;
        }
        const previousNode = this.getNodeAtIndex(idx - 1);
        if (previousNode && previousNode.next) {
            const removeValue = previousNode.next.value;
            previousNode.next = previousNode.next.next;
            this.length--;
            return removeValue;
        }
        return undefined;
    }

    private getNodeAtIndex(idx: number) {
        let currentNode = this.head;
        for (let i = 0; i < idx; i++) {
            currentNode = currentNode?.next;
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
