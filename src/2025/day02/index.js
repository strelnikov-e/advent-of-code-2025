import { readInput } from '../../utils/readInput.js'
const isTest = true;
const input = readInput(import.meta.url, isTest);
const ranges = input.split(',')


function part1() {
    let result = 0;
    for (const id of ranges) {
        const start = Number(id.split('-')[0]);
        const end = Number(id.split('-')[1]);
        for (let i = start; i <= end; i++) {
            const current = i.toString();
            const mid = Math.floor(current.length/2);
            const first = current.substring(0, mid);
            const last = current.substring(mid);
            if (first === last) {
                result += i;
            }
        }
    }
    return result
}

function part2() {
    let result = 0;
    for (const id of ranges) {
        const start = Number(id.split('-')[0]);
        const end = Number(id.split('-')[1]);
        for (let i = start; i <= end; i++) {
            const current = i.toString();
            const mid = Math.floor(current.length/2);

            for (let j = 1; j <= mid; j++) {
                const substring = current.substring(0, j);
                const r = current.replaceAll(substring, '');
                if (r.length === 0) {
                    result += i;
                    break;
                }
            }
        }
    }
    return result
}
const p1res = part1();
const p2res = part2();
const p1expected = 1227775554
const p2expected = 4174379265

console.log(`PART 1 ANSWER:  ${ p1res }  ${isTest? "expected: " + p1expected : ""} ${isTest? p1expected === p1res : ""}`);
console.log(`PART 2 ANSWER:  ${ p2res }  ${isTest? "expected: " + p2expected : ""} ${isTest? p2expected === p2res : ""}`);