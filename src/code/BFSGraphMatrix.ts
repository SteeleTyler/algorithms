export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const previous = new Array(graph.length).fill(-1);

    seen[source] = true;

    const queue = [source];
    do {
        const current = queue.shift() as number;
        if (current === needle) {
            break;
        }
        const adjacent = graph[current];
        for (let i = 0; i < adjacent.length; i++) {
            if (adjacent[i] === 0) {
                continue;
            }
            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            previous[i] = current;
            queue.push(i);
        }

        seen[current] = true;
    } while (queue.length);

    if (previous[needle] === -1) {
        return null;
    }

    let current = needle;
    const path: number[] = [];
    while (previous[current] !== -1) {
        path.push(current);
        current = previous[current];
    }
    return [source].concat(path.reverse());
}
