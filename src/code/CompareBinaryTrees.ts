export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (!a && !b) {
        return true;
    }
    if (!a || !b || a.value !== b.value) {
        return false;
    }
    return compare(a.left, b.left) && compare(a.right, b.right);
}
