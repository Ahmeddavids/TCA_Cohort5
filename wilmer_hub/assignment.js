// // 1. Three Largest Distinct Numbers

// const threeLargestDistinctNumbers = (nums) => {
//   const uniqueNums = [...new Set(nums)];
//   return uniqueNums.sort((a, b) => b - a).slice(0, 3);
// };

// console.log(threeLargestDistinctNumbers([3, 1, 4, 4, 2, 5, 6]));


// // 2. Word Frequency Counter

// const wordFrequencyCounter = (words) => {
//   return words.reduce((freq, word) => {
//     freq[word] = (freq[word] || 0) + 1;
//     return freq;
//   }, {});
// };

// console.log(wordFrequencyCounter(["apple", "banana", "apple", "kiwi", "banana", "kiwi", "kiwi"])); 


// // 3. Flatten a Deeply Nested Array

// const flattenArray = (nestedArray) => nestedArray.flat(Infinity);

// console.log(flattenArray([[1, [2, [3, 4]]], 5])); 

// // 4. Partition Numbers by Multiple of 3

// const partitionByMultipleOf3 = (nums) => {
//   return nums.reduce((result, num) => {
//     if (num % 3 === 0) result.divisibleBy3.push(num);
//     else if (num % 2 === 0) result.divisibleBy2Not3.push(num);
//     else result.neither.push(num);
//     return result;
//   }, { divisibleBy3: [], divisibleBy2Not3: [], neither: [] });
// };

// console.log(partitionByMultipleOf3([3, 8, 15, 2, 10, 12, 7])); 

// // 5. Find Department with Most Employees

// const departmentWithMostEmployees = (departments) => {
//   return departments.reduce((maxDept, dept) => 
//     dept.employees.length > maxDept.employees.length ? dept : maxDept).department;
// };

// console.log(departmentWithMostEmployees([
//   { department: "HR", employees: [{ salary: 3000 }, { salary: 3500 }] },
//   { department: "IT", employees: [{ salary: 5000 }, { salary: 7000 }, { salary: 8000 }] }
// ])); 

// // 6. Find Second Oldest Above Average Salary

// const secondOldestAboveAverage = (people) => {
//   const averageSalary = people.reduce((sum, person) => sum + person.salary, 0) / people.length;
//   const eligible = people.filter(p => p.salary > averageSalary).sort((a, b) => b.age - a.age);
//   return eligible[1].name;
// };

// console.log(secondOldestAboveAverage([
//   { name: "Alice", age: 40, salary: 4000 },
//   { name: "Bob", age: 30, salary: 5000 },
//   { name: "Charlie", age: 50, salary: 3000 },
//   { name: "Dave", age: 45, salary: 6000 }
// ])); 

// // 7. Cumulative Product

// const cumulativeProduct = (nums) => {
//   return nums.reduce((productArray, num, index) => {
//     productArray.push((productArray[index - 1] || 1) * num);
//     return productArray;
//   }, []);
// };

// console.log(cumulativeProduct([1, 2, 3, 4])); 

// // 8. Find the Median of Grades

// const medianGrade = (students) => {
//   const median = (grades) => {
//     const sorted = grades.sort((a, b) => a - b);
//     const mid = Math.floor(sorted.length / 2);
//     return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
//   };

//   return students.map(s => ({ ...s, medianGrade: median(s.grades) }))
//     .sort((a, b) => a.medianGrade - b.medianGrade)[Math.floor(students.length / 2)].name;
// };

// console.log(medianGrade([
//   { name: "Alice", grades: [80, 90, 100] },
//   { name: "Bob", grades: [70, 85, 95] },
//   { name: "Charlie", grades: [60, 75, 80] }
// ])); 

// // 9. Generate Acronym and Count Words

// const acronymAndWordCount = (phrases) => {
//   return phrases.map(phrase => ({
//     acronym: phrase.split(" ").map(word => word[0].toUpperCase()).join(""),
//     words: phrase.split(" ").length
//   }));
// };

// console.log(acronymAndWordCount(["Hello World", "Data Science", "Artificial Intelligence"])); 

// // 10. Find Longest String


// const findLongestString = (strings) => {
//   return strings.reduce((longest, current) => current.length > longest.length ? current : longest, "");
// };

// console.log(findLongestString(["apple", "banana", "pineapple", "kiwi"])); 

// // 11. Find Non-Repeating Character

// const firstNonRepeatingChar = (str) => {
//   for (let char of str) {
//     if (str.indexOf(char) === str.lastIndexOf(char)) return char;
//   }
//   return null;
// };

// console.log(firstNonRepeatingChar("swiss")); 

// // 12. Find Second Most Frequent Word

// const secondMostFrequentWord = (text) => {
//   const words = text.split(" ");
//   const freq = words.reduce((count, word) => {
//     count[word] = (count[word] || 0) + 1;
//     return count;
//   }, {});
//   const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
//   return sorted[1][0];
// };

// console.log(secondMostFrequentWord("the quick brown fox jumps over the lazy dog the quick brown")); 

// // 13. Find Words that Can Be Typed on One Row

// const wordsOnOneRow = (words) => {
//   const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
//   return words.filter(word => {
//     const row = rows.find(r => r.includes(word[0].toLowerCase()));
//     return word.toLowerCase().split("").every(char => row.includes(char));
//   });
// };

// console.log(wordsOnOneRow(["type", "row", "queen", "sad"])); 


const str = "Hello, World!";
let vowelCount = 0;
let reversedStr = "";

for (let i = 0; i < str.length; i++) {
  const char = str[i].toLowerCase();
  if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
    vowelCount++;
  }
  reversedStr = char + reversedStr;
}

const uppercaseStr = str.toUpperCase();

console.log('Vowel count:', vowelCount);
console.log('Reversed string:', reversedStr);
console.log('Uppercase string:', uppercaseStr);


const numbers = [10, 25, 5, 30, 15, 35, 40, 65, 45, 9];

let sum = 0;
let largest = numbers[0];
let smallest = numbers[0];

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
  if (numbers[i] > largest) {
    largest = numbers[i];
  }
  if (numbers[i] < smallest) {
    smallest = numbers[i];
  }
}

console.log('Sum:', sum);
console.log('Largest:', largest);
console.log('Smallest:', smallest);

const fs = require('fs');

fs.readFile('backendStudents.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const updatedData = data.replace(/backend/g, 'frontend');
    fs.writeFile('updatedBackendStudents.txt', updatedData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Updated file written to updatedBackendStudents.txt');
        }
    });
});

// const fs = require('fs');/
const os = require('os');

const systemInfo = `Total Memory: ${os.totalmem()} bytes\nFree Memory: ${os.freemem()} bytes\n`;

fs.writeFile('systemInfo.txt', systemInfo, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('System information written to systemInfo.txt');
    }
});







fs.readFile('backendStudents.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  
  console.log(data.split(' '));
  const wordCount = data.split(' ').length;
  console.log(wordCount);

  fs.writeFile('wordCount.txt', wordCount.toString(), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Word count written to wordCount.txt');
    }
  });
});



function countLines(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const lines = data.split('\n').length;
  fs.writeFileSync('lineCount.txt', lines.toString());
  console.log('Line count written to lineCount.txt');
}

countLines('backendstudents.txt');


fs.mkdir('new_directory', (err) => {
  if (err) throw err;
  console.log('Directory created successfully.');
});
