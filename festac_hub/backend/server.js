const http = require("http");
const fs = require('fs');


http.createServer((req, res) => {
    
fs.readFile('../index.html', 'utf-8', (err, data) => {
    if (err) {
        res.write(err.message);
    } else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.write('Welcome to Festac Hub Backend');
        res.write(data);
        res.end()
        
    }
})

}).listen(2025, () => {
    console.log('Server is listening to PORT: 2025');

});

