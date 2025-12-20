import { readInput } from '../../utils/readInput.js'

const isTest = true;
const input = readInput(import.meta.url, isTest);
const lines = input.split('\n');

class Point {
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getAxis(axis) {
        return axis === 0? this.x : axis === 1? this.y : this.z
    }
}

class Node {
    constructor(point, axis = 0, left = null, right = null) {
        this.point = point;
        this.axis = axis;
        this.left = left;
        this.right = right;
    }

    getPoint() {
        return this.point;
    }
}

function getSqDistance(a, b) {
    const dX = a.getAxis(0) - b.getAxis(0);
    const dY = a.getAxis(1) - b.getAxis(1);
    const dZ = a.getAxis(3) - b.getAxis(3);
    return dX*dX + dY*dY + dZ*dZ;
}

function createTree(points, depth = 0) {
    if (points.length === 0) return null;

    const axis = depth % 3;
    points.sort((a, b) => a.getAxis(axis) - b.getAxis(axis));
    const mid = Math.floor(points.length / 2);

    return new Node(points[mid],
        depth,
        createTree(points.slice(0, mid), depth + 1),
        createTree(points.slice(mid + 1), depth + 1));
}

function nearestNeighbor(node, query, best) {
    if (!node) return best;

    const distance = getSqDistance(node.point, query);

    if (!best || distance < best.distance && node.point !== query) {
        best = { point: node.point, distance: distance };
    }
    const axis = node.axis;
    const diff = query.getAxis(axis) - node.point.getAxis(axis);

    const near = diff < 0? node.left: node.right;
    const far = diff < 0? node.right : node.left;

    best = nearestNeighbor(near, query, best);

    if (diff*diff < best.distance) {
        best = nearestNeighbor(far, query, best)
    }
    return best;
}

function findClosest(points) {
    const root = createTree(points);
    let bestDistance = Infinity;
    const distanceMap = new Map();

    for (const point of points) {
        const result = nearestNeighbor(root, point, null);
        const rootPoint = root.getPoint();
        const resPoint = result.point;
        distanceMap.set(result.distance, {rootPoint, resPoint});
        }
    return distanceMap;
}

function part1() {
    let result = 0;
    const points = [];
    for (let line of lines)
    {
        line = line.split(',');
        points.push(new Point(line[0], line[1], line[2]));
    }
    console.log(result);
    const distMap = findClosest(points);
    var sorted = Array.from(distMap.keys()).sort((a, b) => a - b);
    console.log(sorted);

    console.log(result);
}


function part2() {
    let result = 0;

    return result + 1
}

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);