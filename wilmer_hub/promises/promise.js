const fs = require('fs');

// let result = false

// const test = new Promise( (resolve, reject) => {
//     if (result){
//         resolve('The result came back as True');
//     } else {
//         reject('The result failed and it is False')
//     }
// });

// test.then((data) => console.log(data))
// .catch((error) => console.log(error));


// fs.readFile('../backendstudents.txt', 'utf-8', (err, data) => {
//     if (err){
//         console.log(err);

//     } else {
//         console.log(data);
//     }
// })

// const food =[ 'Spaghetti', 'Beans', 'Plantain', 'Rice'];

// const promise = new Promise((resolve, reject) => {
//     if (food.includes('Plantain')) {
//         resolve('Frying Plantain')
//     } else {
//         reject('Failed to get the desired food')
//     }
// });

// promise.then((result) => console.log(result))
// .catch((error) => console.log(error))


// Write a function processDataSequentially that accepts a number, an array of numbers, and a string as parameters. The function should return a promise that:

// Number: Subtract 5 from the number after a 1-second delay.
// Array of Numbers: Multiply each number by 2 after a 2-second delay.
// String: Convert the string to lowercase after a 3-second delay.
// The function should handle the promises sequentially (i.e., wait for each step to complete before moving to the next one) and return an object with the final results.

// const sequentialData = (number, array, string) => {
//     // Returning A New Promise as a data
//     return new Promise((resolve, reject) => {
//         // Declare variables to hold the final result for each argument.
//         let numberResult;
//         let arrayResult;
//         let stringResult;
//         // Set a timeout for the number result to display at 1 Sec
//         setTimeout(() => {
//             if (!number) {
//                 reject(console.log('Please enter a number value'))
//             }
//             numberResult = number - 5;
//             console.log(numberResult)
//             setTimeout(() => {
//                 if (!array) {
//                     reject(console.log('Please enter an Array value'))
//                 }
//                 arrayResult = array.map((num) => num * 2);
//                 console.log(arrayResult)
//                 setTimeout(() => {
//                     if (!string) {
//                         reject(console.log('Please enter a String value'))
//                     }
//                     stringResult = string.toLowerCase();
//                     console.log(stringResult)
//                     resolve({ 'Number Result: ': numberResult, 'Array Result': arrayResult, 'String Result: ': stringResult });
//                 },3000)
//             }, 2000);
//         }, 5000);
//     })
// }

// sequentialData(20, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'DANIELLA ONYEKWERE').then((finalResult) => console.log('The final Results as an Object: ', finalResult))
//     .catch((err) => console.log(err));


// const add = (a,b) => {
//     return a + b;
// };
// const minus = (a,b) => {
//     console.log(a - b);
// };

// let result = add(5,4) * 2;
// let secondResult = minus(5,4);

// console.log(result, secondResult)


// Reading a file using Promise
const readFileFunction = () => {
    return new Promise((resolve, reject) => {

        fs.readFile('../backendstudents.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err);

            } else {
                resolve(data)
            }
        })
    })
}

// readFileFunction()
// .then((result) => console.log(result))
// .catch((error) => console.log(error))
// .finally(() => console.log('Promise fulfilled'))


// Chaining Promises
const receiveData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data received')
        }, 2000)
    })
}
const processData = (string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${string} and processed`)
        }, 1000)
    })
}

// receiveData().then((data) => processData(data))
// .then((result) => console.log(result))
// .catch((e) => console.log(e))
// .finally(() => console.log('Promise fulfilled'))


// Async Await
const asyncFunction = async () => {
    const data =  receiveData();
    // const result = await processData(data);
    console.log(data);
}
// const asyncFunction = async () => {
//     try {
//         const data = await readFileFunction()
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }
asyncFunction();