const fs = require('fs');
const http = require('http');

/////////////// FILES

///// Blocking, synchoronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

////// Non-blocking, asynchroous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if(err) return console.log('ERRROO!!  ')
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file was written')
//       })
//     });
//   });
// });
/// this log is read first
//console.log('Will read this first')



/////////////// SERVER
///// Create a server and listen
const server = http.createServer((req,res) => {
  //response to the client
  //end is a simplist way to send the response back to the client
  res.end('Hello from the server!');
})

//listen accepts a couple of parameters
//1. port (any number like 3000 - sub address) and 2. localhost(use this address - your computer standard IP address for the local host) 3.optional argument when the server actually starts listening
// accessing 127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port : 8000')
})