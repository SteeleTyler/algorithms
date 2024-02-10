function walk(
    maze: string[],
    wall: string,
    path: Point[],
    visited: boolean[][],
    end: Point,
    current: Point,
) {
    if (
        current.x < 0 ||
        current.x >= maze[0].length ||
        current.y < 0 ||
        current.y >= maze.length ||
        maze[current.y][current.x] === wall ||
        visited[current.y][current.x]
    ) {
        return false;
    }
    path.push(current);
    if (pointsEqual(current, end)) {
        return true;
    }

    visited[current.y][current.x] = true;
    for (const direction of directions) {
        if (
            walk(maze, wall, path, visited, end, {
                x: current.x + direction[0],
                y: current.y + direction[1],
            })
        ) {
            return true;
        }
    }
    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const visited: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        visited[i] = new Array(maze[0].length).fill(false);
    }
    const path: Point[] = [];
    walk(maze, wall, path, visited, end, start);
    return path;
}

const pointsEqual = (point1: Point, point2: Point) =>
    point1.x === point2.x && point1.y === point2.y;

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
