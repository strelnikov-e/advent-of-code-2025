import { readInput } from '../../utils/readInput.js'

const isTest = false;
const input = readInput(import.meta.url, isTest);
const lines = input.split('\n');
const start = lines[0].indexOf('S');


function part1() {
    let result = 0;
    const rays = new Set();
    rays.add(start);
    for (let i = 1; i < lines.length; i++) {
        result += countSplitters(lines[i], rays);
    }
    return result
}

function countSplitters(line, rays) {
    let count = 0;
    for (let r of rays) {
        if (line[r] === '^') {
            count++;
            rays.add(r - 1)
            rays.add(r + 1);
            rays.delete(r)
        }
    }
    return count;
}

function part2() {
    let visited = new Map();
    let result = traverse(lines, start, 0, visited);
    return result + 1
}

function traverse(lines, ray, row, visited) {
    if (row >= lines.length || ray >= lines[row].length) return 0;
    if (visited.has(row + '-' + ray)) return visited.get(row + '-' + ray);
    if (lines[row][ray] === '^') {
        let left = traverse(lines, ray - 1, row + 1, visited);
        let right = traverse(lines, ray + 1, row + 1, visited);
        visited.set((row + 1) + '-' + (ray + 1), right);
        visited.set((row + 1) +'-' + (ray - 1), left);
        return left + right + 1;
    }
    return traverse(lines, ray, row + 1, visited);
}

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);