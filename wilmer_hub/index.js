// // // names = 'Davids'
// // {
// //    let  names = 'Davids'
// //    names = 56
// //     console.log('Block: ',names);
// // }
// // console.log('Global: ',names);
// // const num1 = 56;
// // const num = 75;

// // const sum = num + num1;
// // console.log(sum);


// // Declarative function
// function add (a,b) {
//     // console.log(a + b);
//     const sum = a + b
//     console.log(sum);
//     return sum
// };

// // add(56,75)

// let sum = 800 ;
// // console.log('Sum: ',sum);

// // console.log(add(56,89));
// // Funtion expression
// const multiply = function (a,b) {
//     return a * b
// }
// const result = multiply(5,9);
// // console.log(result);


// // Arrow function
// const formatName = (firstName, lastName, middleName) => {
//     return `Mr. ${firstName.toUpperCase()} ${middleName} ${lastName}`
// };

// // console.log(formatName('Ahmed', 'Isiaka', 'Davids'));

// let str = ' day'
// let str1 = 'day'
// // console.log(str === str1);

let names = ['Christopher', 'Mercy', 'Zainab', 'Chinasa'];
// Annonymous function
//  () =>
//  () => {}
// console.log(names[1].toUpperCase());

names.forEach((chinansa) => {
    // console.log(chinansa.toUpperCase())
});


console.log();

// if (names.includes('Christopher')) {
//     console.log('He is Present');
    
// } else{
//     console.log('He is Absent');
    
// }

// let result = numbers.splice()
// // console.log(result);

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.splice(2, 0);

// console.log(fruits);

// const school = 'The Curve Africa'
// console.log(school.length);

// numbers.find((e) => {
//     console.log(e > 18)
// })


// const numbers = [4, 9, 16, 25, 29, 18];
// const students = [
//     {
//         name: 'Zainab',
//         gender: 'Female',
//         score: 65
//     },
//     {
//         name: 'Emmanuel',
//         gender: 'Male',
//         score: 70
//     },
//     {
//         name: 'Mercy',
//         gender: 'Female',
//         score: 80
//     },
//     {
//         name: 'Kelvin',
//         gender: 'Male',
//         score: 90
//     },

//     {
//         name: 'Ebuka',
//         gender: 'Male',
//         score: 92
//     },
//     {
//         name: 'Davids',
//         gender: 'Male',
//         score: 20
//     },
//     {
//         name: 'Ahmed',
//         gender: 'Male',
//         score: 15
//     },
// ]

// const qualifiedStudents = students.filter((e) => e.score > 60);
// const failedStudents = students.filter((e) => e.score < 60);

// console.log('Passed: ',qualifiedStudents);
// console.log('Failed: ',failedStudents);



// const adult = numbers.filter((e) => e >= 18  );
// const Facilitator = {
//     name: 'Ahmed',
//     gender: 'Male',
//     score: 15
// }


// console.log(students.at(0));
// console.log(students.slice(2,3));
// console.log(students[2]);
// console.log(Facilitator.name);
// console.log(Facilitator["gender"]);
// console.log(Facilitator["score"]);

// console.log(students[4]);

// const students = [
//     {
//         name: 'Blessing',
//         gender: 'Female',
//         stack: 'Backend'
//     },
//     {
//         name: 'Esther',
//         gender: 'Female',
//         stack: 'Product Design'
//     },
//     {
//         name: 'Cynthia',
//         gender: 'Female',
//         stack: 'Product Design'
//     },
//     {
//         name: 'Nora',
//         gender: 'Female',
//         stack: 'Frontend'
//     },
//     {
//         name: 'Obinna',
//         gender: 'Male',
//         stack: 'Frontend'
//     },
//     {
//         name: 'Paul',
//         gender: 'Male',
//         stack: 'Frontend'
//     },
//     {
//         name: 'Anthony',
//         gender: 'Male',
//         stack: 'Backend'
//     },
//     {
//         name: 'Michael',
//         gender: 'Male',
//         stack: 'Product Design'
//     },
//     {
//         name: 'Tijani',
//         gender: 'Male',
//         stack: 'Backend'
//     },
//     {
//         name: 'Mary',
//         gender: 'Female',
//         stack: 'Product Design'
//     },
// ];

// const frontEndStudents = students.filter((e) => e.stack == 'Frontend');
// const backEndStudents = students.filter((e) => e.stack == 'Backend');
// const productDesignStudents = students.filter((e) => e.stack == 'Product Design');

// console.log('Frontend: ',frontEndStudents);
// console.log('Backend: ',backEndStudents);
// console.log('Product Design: ',productDesignStudents);


// const numbers = [45, 4, 9, 16, 25];
// const totalNumbers = numbers.reduce((a,b) => a + b, 1 );

// console.log(totalNumbers);


// console.log(numbers.every((e) => e > 3));

// const randomNumbuer = Math.random();
// // console.log(randomNumbuer);

// console.log(Math.floor(Math.random() * 100));
// // console.log(Math.ceil(Math.random()));


// // currentDate.getFullYear()
// const hour = currentDate.getHours();
// const currentDate = new Date();
// // const today = currentDate.getDay()
// const month = currentDate.getMonth()

// let currentMonth;

// switch (month) {
//     case 0:
//         currentMonth = 'January'
//         break;
//     case 1:
//         currentMonth = 'February'
//         break;
//     case 2:
//         currentMonth = 'March'
//         break;
//     case 3:
//         currentMonth = 'April'
//         break;
//     case 4:
//         currentMonth = 'May'
//         break;

//     case 5:
//         currentMonth = 'June'
//         break;

//     case 6:
//         currentMonth = 'July' 
//         break;

//     case 7:
//         currentMonth = 'August' 
//         break;

//     case 8:
//         currentMonth = 'September' 
//         break;
//     case 9:
//         currentMonth = 'October' 
//         break;
//     case 10:
//         currentMonth = 'November' 
//         break;
//     case 11:
//         currentMonth = 'December' 
//         break;
// }
// console.log(currentMonth);

// let day;
// console.log(today);
// switch (today) {
//     case 0:
//         day = 'Today is: Sunday'
//         break;
//     case 1:
//         day = 'Today is: Monday'
//         break;
//     case 2:
//         day = 'Today is: Tuesday'
//         break;
//     case 3:
//         day = 'Today is: Wednesday'
//         break;
//     case 4:
//         day = 'Today is: Thursday'
//         break;

//     case 5:
//         day = 'Today is: Friday'
//         break;

//     default:
//         day = 'Today is: Saturday' 
//         break;
// }

// console.log(day);

// const fruits = [ 'Mango', 'Apples', 'Pineapple', 'Watermelons', 'Orange']
// const favoriteFruit = 'Paw-Paw'
// if (fruits.includes(favoriteFruit)) {
//     console.log('Buy me Paw-Paw');
// } else if (fruits.includes('Apple')) {
//     console.log("I'll manage Apple");
// } else if (fruits.includes('Watermelon')) {
//     console.log('I can make do with Watermelon');
// } else {
//     console.log('Come back home');
    
// }
// console.log(5 == '5' && 9 == 9);

// // Logical AND
// if (5 == '5' && 9 == 9){
//     console.log('First block runs'); 
// } else {
//     console.log('Second block runs');
// }
// Logical OR
// if (5 === '5' || 7 == 9){
//     console.log('First block runs'); 
// } else {
//     console.log('Second block runs');
// }
const BackendStudents = ['Anthony', 'Chinasa', 'Kelvin', 'Joy', 'Zainab', 'Ebuka', 'Blessing', 'Daniella', 'Mercy'];
let reverseArray = [];

// for (let i = BackendStudents.length - 1; i >= 0  ; i--){
//     reverseArray.push(BackendStudents[i])
//     console.log(BackendStudents[i]);
    
// };
// console.log('Reversed Array: ',reverseArray);

// for (let i = 0; i < BackendStudents.length; i++){
//     console.log(BackendStudents[i]);
    
// };

// for (let i = 20; i < 0; i--) {
//     console.log(i);
// }


