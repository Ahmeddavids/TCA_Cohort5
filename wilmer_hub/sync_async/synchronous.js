// // Main function
// const mainFunction = (callback) => {
//     setTimeout(() => {
//         callback([2, 3, 4]);
//     }, 5000)
// }

// // Add function
// const add = (array) => {
//     let sum = 0;
//     for (let i of array) {
//         sum += i;
//     }
//     console.log(sum);
// }

// add([5,6,8,2,9,89])
// // Calling main function
// mainFunction(add);



const greet = (name, cb) => {
    console.log(`Hello ${name}, Welcome to The Curve Africa`);
    cb();
};
const warn = () => {
    console.log('Christopher Leave her Alone.');
};


// greet('Daniella',warn );

// Write a program that mimics the behaviour of a traffic light, It should print the corressponding colours to the console.
// Red should display after 5 secs
// Yellow should display after 1 minute 
// Green should display 10 secs after Yellow.

// console.log("Red: Stop");
// console.log("Yellow: Ready");
// console.log("Green: Go");
const man = Math.floor(Math.random() * 100);
const woman = Math.ceil(Math.random() * 100);

// console.log("Ceil Numbers: ",randomCeilNumbers);
// console.log("Floor Numbers: ",randomNumbers);
console.log("Man: ",man);
console.log('Woman: ',woman);
console.log((man+woman)/2);

const trafficLight = (man, woman) => {
    const average = (man+woman)/2
    
    setTimeout( () => {
        console.log(`The average score is: ${average}. Run for your life`);  
    }, 5000);
    setTimeout( () => {
        console.log("Yellow: Ready");  
    }, 15000);
    setTimeout( () => {
        console.log("Green: Go");  
    }, 20000);
};

trafficLight('Christopher', 'Daniella');

// Write a love calculator program that takes two namesof lovers, generate a number for them and calculate their average score and prints to the console their corresponding results after 10 secs.


// 90 above: The score for Christopher is 50, core sfor Daniella is 99, Your average score is 72.5 you're compatible, Please Marry.
// 75 to 89: You're slightly compatible, You can Marry.
// 55 to 74 above: You're not compatible, Please break up.
// 54 below: Incompatible: Run for your life.


// console.log("Task 1");

// setTimeout(() => {
//     console.log('2 Seconds');
//     setTimeout(() => {
//         console.log('1 Second');

//     }, 1000);
//     setTimeout(() => {
//         console.log('1 Second');

//     }, 1000);
//     setTimeout(() => {
//         console.log('1 Second');

//     }, 1000);
//     setTimeout(() => {
//         console.log('1 Second');

//     }, 1000);
//     setTimeout(() => {
//         console.log('1 Second');

//         setTimeout(() => {
//             console.log('1 Second');
    
//         }, 1000);
//         setTimeout(() => {
//             console.log('1 Second');
    
//             setTimeout(() => {
//                 console.log('1 Second');
        
//             }, 1000);
//             setTimeout(() => {
//                 console.log('1 Second');
        
//             }, 1000);
//             setTimeout(() => {
//                 console.log('1 Second');
        
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 2000);


// console.log("Task 3");