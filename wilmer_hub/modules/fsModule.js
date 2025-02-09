const fs = require('fs');
const http = require('http');

// Read a File
// fs.readFile('./backendstudents.txt', 'utf-8', (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);

//     }
// })

// http.createServer((req, res) => {
//     fs.readFile('./index.html', 'utf-8', (error, data) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.write(data);
//             res.end();

//         }
//     })
// }).listen(2024);

// Write to File
// fs.writeFile('./frontendstudents.txt', `1. Agu Ezekiel \n2. Sudais Umar`, 'utf-8', (err, data) => {
//     console.log('Writing to file......');
//     // Check for error
//     if (err){
//         console.log(err);

//     }
//     console.log('Done writing');
// })


// Append to a File
// fs.appendFile('./backendstudents.txt', `\n5. Anthony Aimudo \n6. Sheu Tijani`, 'utf-8', (err, data) => {
//     console.log('Appending to file......');
//     // Check for error
//     if (err) {
//         console.log(err);

//     }
//     console.log('Data is appended to file successfully');
// });

// fs.unlink('./frontendstudents.txt', (error) => {
//     if(error){
//         console.log(error);

//     } else{
//         console.log('File deleted successfully');

//     }
// });

//  WED 13/12/24
// Import OS module
const os = require('os');

// console.log('Free Memory: ',os.freemem());
// console.log('Total Memory: ',os.totalmem());
// console.log('Host name: ',os.hostname());
// console.log('Version: ',os.version());
// console.log('Release: ',os.release());

// Class work
// Number 5
const numbers = [10, 25, 5, 30, 15, 35, 40, 65, 45, 9,];
const arrayAnalysis = (arrayOfNumbers) => {
  // Initialize the value for sum, largest number and smallest number
  let sum = 0;
  let largestNumber = arrayOfNumbers[0];
  let smallestNumber = arrayOfNumbers[0];
  // Run a for loop to count the numbers
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    // Sum up the numbers as the loop runs
    sum += arrayOfNumbers[i]
    // Check for the largest number and update the variable
    if (arrayOfNumbers[i] > largestNumber) {
      largestNumber = arrayOfNumbers[i]
    }
    // Check for the smallest number and update the variable
    else if (arrayOfNumbers[i] < smallestNumber) {
      smallestNumber = arrayOfNumbers[i]
    }
  }
  // Formatting the results into a variable
  const result = `The Sum: ${sum} \nLargest Number: ${largestNumber} \nSmallest Number: ${smallestNumber}`

  // return console.log();
  // Writing the results into a new file
  fs.writeFile('./arrayAnalysis.txt', result, 'utf-8', (err, data) => {
    if (err) {
      console.log('Error Writing to Array Analysis File', err);
    } else {
      console.log('Successfully written Analysis to File');
    }
  })


}

// arrayAnalysis([5,8,6,9,7,3,2,1])



// Number 1
const countWords = (filePath, resultPath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Check for an error
      console.log('Error reading File: ', err)
    } else {
      // Split and counts the words
      const counts = data.split(' ').length;
      // Writing the counts into a new file
      fs.writeFile(resultPath, counts.toString(), (err, data) => {
        if (err) {
          // Check for error
          console.log(`Error Writing to ${resultPath}`, err);
        } else {
          // Log a success message
          console.log(`Successfully written to ${resultPath}`);
        }
      })
    }
  })
}

// countWords('./backendstudents.txt', 'chanasa.txt');

// Number 3
const createDirectory = (path) => {
  fs.mkdir(path, (err) => {
    if (err) {
      return console.log('Error creating Directory');
    } else {

      console.log('New Directory created successfully');
    }

  })
}

// createDirectory('./Sleeping_Chinasa')

const memoryInfo = (memoryPath) => {
  // Get the Free and Total memory and the calculate the used memory
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
// Format the result into a variable
  const result = `Total Memory: ${totalMemory} bytes \nFree Memory: ${freeMemory} bytes \nUsed Memory: ${usedMemory} bytes`
  // return console.log();
  fs.writeFile(memoryPath, result, (err, data) => {
    if (err) {
      // Check for error
      console.log(`Error Writing to ${memoryPath}`, err);
    } else {
      // Log a success message
      console.log(`Successfully written to ${memoryPath}`);
    }
  })

};

// memoryInfo('joy.txt')

const vowelCount = (string) => {
  let count = 0
  for (let i = 0; i < string.length; i++) {
    const character = string[i].toLowerCase();
    if (character === 'a' || character === 'e' || character === 'i' || character === 'o' || character === 'u') {
      count++
    }
  }
  return console.log(`The Total Number of Vowel in ${string} is: ${count}`);
  
}


// vowelCount('BLESSING OcheYechi Christopher')

const countLinesOfWords = (filePath, resultPath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Check for an error
      console.log('Error reading File: ', err)
    } else {
      // Split and counts the words
      const counts = data.split('\n').length;
      // Writing the counts into a new file
      fs.writeFile(resultPath, counts.toString(), (err, data) => {
        if (err) {
          // Check for error
          console.log(`Error Writing to ${resultPath}`, err);
        } else {
          // Log a success message
          console.log(`Successfully written to ${resultPath}`);
        }
      })
    }
  })
}

countLinesOfWords('backendstudents.txt', 'Crush_Book.txt')
