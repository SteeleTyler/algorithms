interface Node<V> {
    value: V;
    next?: Node<V>;
    previous?: Node<V>;
}

export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    private head?: Node<V>;
    private tail?: Node<V>;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.length = 0;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        const result = this.lookup.get(key);
        if (result) {
            result.value = value;
            this.moveToHead(result);
            return;
        }
        const newNode: Node<V> = { value: value };
        this.length++;
        this.prepend(newNode);
        if (this.length > this.capacity) {
            this.ejectTail();
        }

        this.lookup.set(key, newNode);
        this.reverseLookup.set(newNode, key);
    }
    get(key: K): V | undefined {
        const result = this.lookup.get(key);
        if (result) {
            if (result !== this.head) {
                this.moveToHead(result);
            }
            return result.value;
        }
        return undefined;
    }

    moveToHead(node: Node<V>) {
        if (this.tail === node) {
            this.tail = node.previous;
        }
        if (node.previous) {
            node.previous.next = node.next;
        }
        if (node.next) {
            node.next.previous = node.previous;
        }
        node.next = undefined;
        node.previous = undefined;
        this.prepend(node);
    }

    prepend(node: Node<V>) {
        if (this.head) {
            this.head.previous = node;
            node.next = this.head;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    }

    ejectTail() {
        this.length--;
        if (!this.tail) {
            return;
        }
        const key = this.reverseLookup.get(this.tail);
        key && this.lookup.delete(key);
        this.reverseLookup.delete(this.tail);
        if (this.length === 0) {
            this.head = this.tail = undefined;
            return;
        }
        if (this.tail && this.tail.previous) {
            this.tail = this.tail.previous;
            this.tail.next = undefined;
        }

        if (this.length === 1) {
            this.head = this.tail;
        }
    }
}
