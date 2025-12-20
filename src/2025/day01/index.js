import { readInput } from '../../utils/readInput.js'

const input = readInput(import.meta.url, false);
const lines = input.split('\n')


function part1() {
    let result = 0;
    let point = 50;
    for (const line of lines) {
        let slice = Number(line.slice(1));
        console.log(slice);
        if (line.charAt(0) === 'L')
        {
            while (slice >= 100)
            {
                slice -= 100;
            }
            point -= slice;
            while (point < 0)
            {
                if (point === 0) result++;
                point += 100;
            }
            console.log("POINT: "  + point);
        }
        else
        {
            point += slice;
            while (point >= 100)
            {
                point -= 100;
                result++;
            }
        }
    }

    return result
}

function part2() {
    let result = 0;
    let point = 50;
    for (const line of lines) {
        const sign = line.charAt(0) == 'L';
        const slice = sign? - Number(line.slice(1)): Number(line.slice(1));
        let shouldAdd = point !== 0;
        point += slice;

        while (point < 0)
        {
            point += 100;
            if (shouldAdd)
            {
                result++;
            }
            shouldAdd = true;
        }
        if (slice !== 0 && point === 0) result++;
        while (point > 99)
        {
            point -= 100;
            result++;
        }
    }
    return result
}

console.log("PART 1: " + part1());
console.log("PART 2: " + part2());