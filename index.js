const fs = require('fs');
const http = require('http');
const url = require('url');

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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

//synchronous version - we only call once when the program starts
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
  console.log(req.url);

  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {'Content-type': 'text/html'});

    //map returns array so we change it to string with "join"
    const cardsHtml = dataObj.map(el => replaceTemplate(card, el)).join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

  // Product page
  } else if (pathName === '/product') {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(product)

  // API
  } else if (pathName === '/api') {
    //fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      //const productData = JSON.parse(data);
      // we need to tell browser that we will send json data
      //res.writeHead(200, {'Content-type': 'application/json'});
    //   res.end(data);
    // });

    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(data)
  // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found</h1>');
    console.log('page not found');
  }
  //response to the client
  //end is a simplist way to send the response back to the client
    //res.end('Hello from the server!');
})

//listen accepts a couple of parameters
//1. port (any number like 3000 - sub address) and 2. localhost(use this address - your computer standard IP address for the local host) 3.optional argument when the server actually starts listening
// accessing 127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port : 8000')
});