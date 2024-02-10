function search_binary_tree(
    current: BinaryNode<number> | null,
    needle: number,
): boolean {
    if (!current) {
        return false;
    }
    if (current.value === needle) {
        return true;
    }

    return current.value > needle
        ? search_binary_tree(current.left, needle)
        : search_binary_tree(current.right, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search_binary_tree(head, needle);
}
