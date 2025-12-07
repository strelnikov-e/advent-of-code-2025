import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export function readInput(fileURL, isTest) {
    const inputFile = isTest? "test-input.txt" : "input.txt";
    const __filename = fileURLToPath(fileURL);
    const __dirname = path.dirname(__filename)

    console.log(__dirname)
    return fs.readFileSync(path.join(__dirname, inputFile), 'utf8').trimEnd();
}