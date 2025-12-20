// @ts-ignore
import { readInput } from '../../utils/readInput.js'

const isTest = false;
const input = readInput(import.meta.url, isTest);
const lines = input.split('\n');
const numberOfBoxes: number = isTest ? 10 : 1000;

class Point {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(x: number ,y: number ,z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getAxis(axis: number): number {
        return axis === 0? this.x : axis === 1? this.y : this.z
    }
}

class Line {
    private readonly a: Point;
    private readonly b: Point;
    private readonly dist: number;

    constructor(a : Point, b: Point) {
        this.a = a;
        this.b = b;
        this.dist = getSqDistance(a, b);
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    getDist() {
        return this.dist;
    }
}

class UnionFind {
    private readonly parents;
    private readonly rank;


    constructor() {
        this.parents = new  Map<Point, Point>();
        this.rank = new Map();
    }

    init(points: Point[]) {
        for (const point of points) {
            this.parents.set(point, point);
        }
    }

    find(i:Point): Point {
        let root = this.parents.get(i);
        if (this.parents.get(root) !== root) {
            this.parents.set(i, this.find(root));
            return this.parents.get(i);
        }
        return root;
    }

    union(a:Point, b:Point) {
        if (!this.parents.has(a)) this.add(a);
        if (!this.parents.has(b)) this.add(b);

        let pa = this.find(a);
        let pb = this.find(b);

        if (pa === pb) return;

        let ra = this.rank.get(pa);
        let rb = this.rank.get(pb);

        if (ra < rb) {
            this.parents.set(pa, pb)
        } else if (ra > rb) {
            this.parents.set(pb, pa)
        } else {
            this.parents.set(pb, pa)
            this.rank.set(pa, ra + 1)
        }
    }

    groups() {
        const result = new Map();
        for (let i of this.parents.keys()) {
            let root = this.find(i);
            if (!result.has(root)) result.set(root, []);
            result.get(root).push(i);
        }
        return [...result.values()];
    }

    add(i:Point) {
        this.parents.set(i, i);
        this.rank.set(i, 0);
    }
}

function getSqDistance(a: Point, b: Point): number {
    const dX = a.getAxis(0) - b.getAxis(0);
    const dY = a.getAxis(1) - b.getAxis(1);
    const dZ = a.getAxis(3) - b.getAxis(3);
    return dX*dX + dY*dY + dZ*dZ;
}

function getDistanceMap(points: Point[]): Array<Line> {
    const distances = [];
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const a: Point = points[i];
            const b: Point = points[j];
            distances.push(new Line(a, b));
        }
    }
    return distances.sort((a, b) => a.getDist() - b.getDist());
}

function part1() {
    const uf = new UnionFind();
    const points = [];
    for (let line of lines)
    {
        line = line.split(',');
        points.push(new Point(line[0].trim(), line[1].trim(), line[2].trim()));
    }

    const distances: Array<Line> = getDistanceMap(points);

    uf.init(points);
    for (let i = 0; i < numberOfBoxes; i++) {
        let a = distances[i].getA();
        let b = distances[i].getB();
        uf.union(a, b)
    }
    const groups = uf.groups().sort((a,b) => b.length - a.length);

    const result = groups[0].length * groups[1].length * groups[2].length;
    return result;
}


function part2() {
    const points = [];
    for (let line of lines)
    {
        line = line.split(',');
        points.push(new Point(line[0].trim(), line[1].trim(), line[2].trim()));
    }
    const distances: Array<Line> = getDistanceMap(points);

    const uf = new UnionFind();
    uf.init(points);
    let a : Point;
    let b : Point;
    let i = 0;
    while (uf.groups().length > 1) {
        a = distances[i].getA();
        b = distances[i].getB();
        uf.union(a, b)
        i++;
    }
    return a.x * b.x;
}

console.log(`PART 1 ANSWER:  ${ part1() }`);
console.log(`PART 2 ANSWER:  ${ part2() }`);