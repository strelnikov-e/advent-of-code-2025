import { readInput } from '../../utils/readInput.js'
const isTest = false;
const input = readInput(import.meta.url, isTest);
const ranges = [];
const products  = [];
for (let line of input.split('\n')) {
    if (line.includes("-"))
    {
        const index = line.indexOf("-");

        ranges.push({start: Number(line.substring(0, index)), end: Number(line.substring(index + 1))})
    } else {
        if (line.charAt(0) !== "\r")
        {
            products.push(Number(line));
        }
    }
}

function part1() {
    let result = 0
    for (let p of products) {
        for (let r of ranges) {
            if (p >= r.start && p <= r.end) {
                result++;
                break;
            }
        }
    }
    return result
}

function part2() {
    const sortedRanges = ranges.sort((a, b) => a.start - b.start);
    sortedRanges.forEach(r => {console.log(r)})
    const merged = [];
    merged.push(sortedRanges[0]);
    for (let r of sortedRanges) {
        const start = Number(r.start);
        const end = Number(r.end);
        const pop = merged.pop();
        if (start <= pop.end)
        {
            pop.end = Math.max(end, pop.end);
            merged.push(pop);
        }
        else
        {
            merged.push(pop, r);
        }
    }
    let result = 0
    console.log("merged");
    for (let r of merged) {
        console.log(r)
        result += r.end - r.start + 1;
    }
    return result
}

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);