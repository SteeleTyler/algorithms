function pre_order_traverse(node: BinaryNode<number> | null, path: number[]) {
    if (!node) {
        return;
    }
    path.push(node.value);
    pre_order_traverse(node.left, path);
    pre_order_traverse(node.right, path);
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    pre_order_traverse(head, path);
    return path;
}
