function post_order_traverse(node: BinaryNode<number> | null, path: number[]) {
    if (!node) {
        return;
    }
    post_order_traverse(node.left, path);
    post_order_traverse(node.right, path);
    path.push(node.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    post_order_traverse(head, path);
    return path;
}
