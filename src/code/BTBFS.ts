export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = [head];
    while (queue.length) {
        const current = queue.shift();
        if (!current) {
            continue;
        }
        if (current.value === needle) {
            return true;
        }

        current.left && queue.push(current.left);
        current.right && queue.push(current.right);
    }
    return false;
}
