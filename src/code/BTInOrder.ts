function in_order_traverse(node: BinaryNode<number> | null, path: number[]) {
    if (!node) {
        return;
    }
    in_order_traverse(node.left, path);
    path.push(node.value);
    in_order_traverse(node.right, path);
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    in_order_traverse(head, path);
    return path;
}
