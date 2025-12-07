import { readInput } from '../../utils/readInput.js'
const isTest = false;
const input = readInput(import.meta.url, isTest);
const banks = input.split('\n')


function part1() {
    let result = 0
    for (let line of banks) {
        line = line.trim();
        let first = '0';
        let second = '0';
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            if (char > first && i < line.length - 1) {
                first = char;
                second = '0'
            }
            else if (char > second) {
                second = char;
            }
        }
        result += parseInt(first + second, 10)
    }
    return result
}

function part2() {
    let result = 0
    const batteries = 12;
    for (let line of banks) {
        line = line.trim();
        let startIndex = 0;
        let endIndex = line.length - batteries;
        let number = ""
        while (number.length < batteries) {
            let i = startIndex;
            let biggest = '0'
            while (i <= endIndex) {
                if (biggest < line.charAt(i)) {
                    biggest = line.charAt(i);
                    startIndex = i + 1;
                }
                i++;
            }
            endIndex = Math.min(++endIndex, line.length);
            number += biggest;
        }
        result += Number(number);
    }
    return result
}

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);