import fs from 'fs/promises'

let a = await fs.readFile('write.txt')
console.log(a.toString());

let b = await fs.appendFile('promise.txt',' \nthis is a promise')
console.log(b);