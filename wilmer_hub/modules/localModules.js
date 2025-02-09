const add = (y, z) => {
    return y + z;
};

const multiply = (a,b) => {
    return a * b
};

const subtract = (a, b) => {
    return a-b;
};

const divide = (t,u) => {
    return t/u;
};

module.exports = {
    add,
    multiply,
    divide,
    subtract
}
    // console.log('Add: ',add(85,6));
    // console.log('Multiply: ',multiply(85,6));
    // console.log('Subtract: ',subtract(85,6));
    // console.log('Divide: ',divide(85,6));