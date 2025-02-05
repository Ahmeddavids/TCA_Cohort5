// Import our HTTP module
const http = require('http');
// Declare our PORT
const PORT = 2025;

const students = [
    {
        id: 1,
        name: 'Ernest_Enejo',
        stack: 'Backend',
        isMarried: true,
        age: 20,
        complexion: 'Caramel'
    },
    {
        id: 2,
        name: 'MaryJane_Uzochukwu',
        stack: 'Backend',
        isMarried: true,
        age: 21,
        complexion: 'Chocolate'
    },
    {
        id: 3,
        name: 'Urigwe_Somto',
        stack: 'Backend',
        isMarried: false,
        age: 22,
        complexion: 'Vanilla'
    },
    {
        id: 4,
        name: 'Azeez_Obadina',
        stack: 'Backend',
        isMarried: true,
        age: 23,
        complexion: 'Fair'
    }
]


// Create an Instance of our server and perform a CRUD operation
const app = http.createServer((req, res) => {
    // Home page
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Welcome to Festac Hub Home Page');
        res.end();
    } else if (req.url === '/students' && req.method === 'GET') {
        // Get all students
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
            message: 'All students',
            students,
            totalNUmbers: `The total number of student is: ${students.length}`
        }))
    } else if (req.url === '/students' && req.method === 'POST') {
        // POST. Add new student
        let body = '';
        req.on('data', chunk => (body += chunk) );
        req.on('end', () => {
            const newStudent = JSON.parse(body);
            newStudent.id = students.length + 1;
            students.push(newStudent)
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
            message: 'New student Added successfully',
            students,
            totalNUmbers: `The total number of student is: ${students.length}`
            }))  
        })    
    } else if (req.url.startsWith('/students/') && req.method === 'GET') {
        // Get a student by name
        const studentName = req.url.split('/')[2];
        const student = students.find((value) => value.name.toLowerCase() === studentName.toLowerCase())
        if (student) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
        message: 'Student found',
        data: student
        }))  
        } else{
            res.writeHead(404)
            res.write('Student not found')
            res.end()
        }
        
    } else if (req.url.startsWith('/students/') && req.method === 'PUT') {
        // Update a student data
        const studentName = req.url.split('/')[2];
        const studentIndex = students.findIndex((value) => value.name.toLowerCase() === studentName.toLowerCase());
        let body = '';
        req.on('data', chunk => (body += chunk) );
        req.on('end', () => {
            if (studentIndex !== -1) {
                const updatedData = JSON.parse(body);
                students[studentIndex] = {...students[studentIndex], ...updatedData};
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                message: 'Student data updated successfully',
                data: students[studentIndex]
        }))  
            } else {
            res.writeHead(404)
            res.write('Student not found')
            res.end()
            }
        })
    } else if (req.url.startsWith('/studentsbyid/') && req.method === 'GET') {
        // Get a student by ID
        const studentId = req.url.split('/')[2];
        // console.log(typeof studentId);
        
        const student = students.find((value) => value.id == studentId)
        if (student) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
        message: 'Student found',
        data: student
        }))  
        } else{
            res.writeHead(404)
            res.write('Student not found')
            res.end()
        }
    }
});
// Listen to the PORT
app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})









// // Create an Instance of our server
// const app = http.createServer((req, res) => {

//     if (req.url === '/' && req.method === 'GET') {
//         res.write('Welcome to Festac Hub');
//         res.end();
//     }else if (req.url === '/students' && req.method === 'GET') {
//         res.end(JSON.stringify({
//             message: 'All students',
//             students,
//             totalNUmbers: `The total number of student is: ${students.length}`
//         }))
//     } else {
//         res.write('Invalid URL');
//         res.end();
//     }
//     // console.log(req);
    
// });
// // Listen to the PORT
// app.listen(PORT, () => {
//     console.log(`Server is listening to PORT: ${PORT}`);
// })