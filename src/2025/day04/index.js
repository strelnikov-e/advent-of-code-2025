import { readInput } from '../../utils/readInput.js'
const isTest = false;
const input = readInput(import.meta.url, isTest);
const map = input.split('\n')


function part1() {
    let result = 0
    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            let removable = getObjectsAround(x, y);
            if (removable) {
                result++
            }
        }
    }
    return result
}

function part2() {
    let result = 0
    let isRemoved = true;
    while (isRemoved) {
        isRemoved = false;
        for (let y = 0; y < map.length; y++) {
            const row = map[y];
            for (let x = 0; x < row.length; x++) {
                let removable = getObjectsAround(x, y);
                if (removable) {
                    result++
                    isRemoved = true;
                    const line = map[y];
                    const modified = line.substring(0,x) + '.' + line.substring(x + 1);
                    map[y] = modified;
                }
            }
        }
    }

    return result
}

// function part2() {
//     let result = 0
//     let y = 0;
//     let x = 0;
//     while (y < map.length) {
//         const row = map[y];
//         while (x < row.length) {
//             let removable = getObjectsAround(x, y);
//             if (removable) {
//                 result++
//             }
//             x++;
//         }
//         y++;
//     }
//     return result
// }

const p1res = part1();
const p2res = part2();

console.log(`PART 1 ANSWER:  ${ p1res }`);
console.log(`PART 2 ANSWER:  ${ p2res }`);

function getObjectsAround(x, y)
{
    if (map[y][x] !== '@') return 0;
    let res = 0;
    if (map[y] !== undefined && map[y][x+1] === '@') {
        res++;
    }
    if (map[y] !== undefined && map[y][x-1] === '@') {
        res++;
    }
    if (map[y+1] !== undefined && map[y+1][x] === '@') {
        res++;
    }
    if (map[y-1] !== undefined && map[y-1][x] === '@') {
        res++;
    }
    // diagonals
    if (map[y+1] !== undefined && map[y+1][x+1] === '@') {
        res++;
    }
    if (map[y+1] !== undefined && map[y+1][x-1] === '@') {
        res++;
    }
    if (map[y-1] !== undefined && map[y-1][x+1] === '@') {
        res++;
    }
    if (map[y-1] !== undefined && map[y-1][x-1] === '@') {
        res++;
    }
    return res < 4;
}