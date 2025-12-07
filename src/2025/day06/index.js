import { readInput } from '../../utils/readInput.js'

const isTest = false;
const input = readInput(import.meta.url, isTest);
const lines = [];
for (let line of input.split('\n')) {
    line = line.trim().split(/\s+/);
    lines.push(line);
}
const operands = lines[lines.length - 1];
const expressions = [];

for (let i = 0; i < lines[0].length; i++) {
    const exp = [];
    for (let line of lines) {
        exp.push(line[i]);
    }
    expressions.push(exp);
}


function part1() {
    let result = 0
    for (let e of expressions) {
        const op = e.pop();
        let subRes =  op === '+'? 0: 1;
        for (let n of e)
        {
            n = Number(n);
            if (op === '+') {
                subRes += n;
            }
            else {
                subRes *= n;
            }
        }
        result += subRes;
    }
    return result
}

function part2() {
    let result = 0
    let lines = input.replaceAll('\r', '').split('\n');
    lines.pop();
    let pointer = 0;
    for (let op of operands)
    {
        let subRes = op === '+'? 0 : 1;
        while (pointer < lines[0].length) {
            let currentNum = '';
            for (let l of lines) {
                if (l[pointer] !== ' ') {
                    currentNum += l[pointer];
                }
            }
            pointer++;
            if (currentNum === '') {
                // means this is a separator
                break;
            }
            if (op === '+') {
                subRes += Number(currentNum);
            } else {
                subRes *= Number(currentNum);
            }
        }
        result += subRes;
    }

    return result
}

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);