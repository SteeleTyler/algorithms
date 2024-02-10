function walk(
    graph: WeightedAdjacencyList,
    current: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[current]) {
        return false;
    }
    path.push(current);
    if (current === needle) {
        return true;
    }
    seen[current] = true;
    const list = graph[current];
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = [];
    const path: number[] = [];

    if (walk(graph, source, needle, seen, path)) {
        return path;
    }
    return null;
}
