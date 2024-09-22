let globalResult;


function logResult(some) {
    console.log("The result is: " + some);
}


function storeResult(some) {
    globalResult = some;
}

function myCalculator(num1, num2, myCallback) {
    let sum = num1 + num2;
    myCallback(sum);
}

// Use the myCalculator function with different callbacks
myCalculator(5, 5, logResult);   // Logs to the console
myCalculator(5, 5, storeResult); // Stores in a global variable

console.log("Stored result:", globalResult); // Logs the stored result


console.log('Promises')

let prom1 = new Promise((resolve, reject) => {
    let a = Math.random()
    if(a<0.5){
        reject('Random Number 1 Raised Error')
    }
    else{
        setTimeout(() => {
            resolve('Random Number 1 was accepted')
        }, 0);
    }
})

let prom2 = new Promise((resolve, reject) => {
    let bc = Math.random()
    if(bc<0.5){
        reject('Random Number 2 Raised Error')
    }
    else{
        setTimeout(() => {
            resolve('Random Number 2 was accepted')
        }, 0);
    }
})

prom1.then((ac) =>{
    console.log(ac)
}).catch((ec) =>{
    console.log(ec)
})

prom2.then((ac) =>{
    console.log(ac)
}).catch((ec) =>{
    console.log(ec)
})

Promise.allSettled([prom1, prom2])
    .then((results) => {
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                console.log('Fulfilled:', result.value);
            } else {
                console.log('Rejected:', result.reason);
            }
        });
    });


async function getData(){
    let x1 = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    let data1 = await x1.json()
    console.log(data1);
}

async function postData(){
    let x2 = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
let data2 = await x2.json() 
return data2
}

async function main(){
    console.log('Loading modules')
    console.log('Loading Data')

    let data3 = await getData()
    console.log(data3);
    console.log("Data Downloaded");
    
    let data4 = await postData()
    console.log('Processing data');
    console.log(data4);
    console.log('Data Uploaded');
    
}

main()



async function sleep(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(45)
        }, 1000);
    })
}

//IIFE Immediately Invoked Func. Expression

(async function main(){
    let a = await sleep()
    console.log(a);
    
    let b = await sleep()
    console.log(b);
})()