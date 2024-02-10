function hasUnvisited(seen: boolean[], distances: number[]): boolean {
    return seen.some(
        (nodeSeen, index) => !nodeSeen && distances[index] < Infinity,
    );
}

function getLowestUnvisited(seen: boolean[], distances: number[]): number {
    let index = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }
        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            index = i;
        }
    }
    return index;
}
export default function dijkstra_list(
    source: number,
    sink: number,
    array: WeightedAdjacencyList,
): number[] {
    const seen = new Array(array.length).fill(false);
    const previous = new Array(array.length).fill(-1);
    const distances = new Array(array.length).fill(Infinity);
    distances[source] = 0;

    while (hasUnvisited(seen, distances)) {
        const current = getLowestUnvisited(seen, distances);
        seen[current] = true;
        const edges = array[current];
        edges.forEach((edge) => {
            if (!seen[edge.to]) {
                const distance = distances[current] + edge.weight;
                if (distance < distances[edge.to]) {
                    distances[edge.to] = distance;
                    previous[edge.to] = current;
                }
            }
        });
    }

    const out: number[] = [];
    let current = sink;
    while (previous[current] !== -1) {
        out.push(current);
        current = previous[current];
    }
    out.push(source);
    return out.reverse();
}
