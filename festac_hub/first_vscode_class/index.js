// // function add (a, b) {
// //     // console.log('Function',a+b);
// //     return a + b;
// // }
// // let sum = add(5,6);
// // console.log('Sum',sum);

// // Operators
// // Arithemetic Operator
// // let num = 55;
// // num += 10
// // console.log(num);

// // Comparison Operators
// // Loosely Equal to ==


// // console.log(x === y)
// // Not Equal to
// // console.log(x != y);

// // Not strictly equal to
// // console.log(x !== y);

// // console.log(x >= y);
// let x = 4;
// let y = 5;
// // Logical Operators
// // And operator
// // console.log(x < 3 && y > 6);
// // OR operator
// console.log(x > 3 || y > 6);
// const foods = [ 'Rice', 'Beans', 'Dodo', 'Spaghetti', 'Moi-Moi',  ];

// if (foods.includes('Salad')) { 
//     console.log('Salad not added');
// }
// else { 
//     foods.push('Salad');
//     console.log("Salad added");
// }
// console.log('Foods: ',foods);

// const foods = [ 'Rice', 'Beans', 'Dodo', 'Spaghetti', 'Moi-Moi', 'Egg' ];

// if (foods.includes('Salad')) {
//     console.log('Buy me Salad');
    
// } else if (foods.includes('Egg')) {
//     console.log('Buy me Egg, Rice and Beans');
// } else {
//     console.log('Just buy only Rice');
// }

// const foods = [ 'Rice', 'Bean', 'Dodo', 'Spaghetti', 'Moi-Moi', 'Egg' ];

// if (foods.includes('Beans') && foods.includes('Rice')) {
//     console.log('Buy me Beans and Rice');
    
// } else if (foods.includes('Dodo') && foods.includes('Rice')) {
//     console.log('Buy me Rice and Dodo');
// } else {
//     console.log('Just buy me only Rice');
// }

// const foods = [ 'Rice', 'Bean', 'Plantain', 'Spaghetti', 'Moi-Moi', 'Egg' ];

// if (foods.includes('Beans') || foods.includes('Salad')) {
//     console.log('Buy me Rice and Beans or Salad');
    
// } else if (foods.includes('Dodo') || foods.includes('Spaghetti')) {
//     console.log('Buy me Rice and Dodo or Spaghetti');
// } else {
//     console.log('Just buy me only Rice');
// }

let digits = 25;
if (digits < 30){
    digits = digits + 3
    console.log('Digits increased by 3');
} else if(digits > 24) {
    digits = digits + 1
    console.log('Digits increased by 1');
} else {
    console.log('The value of digit is unchanged');
}
 console.log(digits);
 