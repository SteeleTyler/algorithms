export default function two_crystal_balls(breaks: boolean[]): number {
    const step = Math.floor(Math.sqrt(breaks.length));
    let current = step;
    while (current < breaks.length) {
        if (breaks[current]) {
            break;
        }
        current += step;
    }
    for (let i = Math.max(current - step, 0); i < breaks.length; i++) {
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}
