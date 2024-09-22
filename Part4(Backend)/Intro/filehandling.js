const fs = require('fs')

console.log('starting...');

fs.writeFileSync('write.txt', 'Entering text')
fs.writeFile('write2.txt', 'Entering more text', ()=>{
    console.log('done...');
    fs.readFile('write2.txt', (error, data)=>{
        console.log(error, ' , ', data.toString());
    })
})

fs.appendFile('write.txt', ' We Have appended this yay', (error, data)=>{
    console.log(data);
})

console.log('ending...');
