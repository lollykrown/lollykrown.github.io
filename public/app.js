const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// const nav = [
//   { link: '/portfolio', title: 'Portfolio' },
//   { link: '/contact', title: 'Contact' }
// ];

// const bookRouter = require('./src/routes/bookRoutes')(nav);

// app.use('/', bookRouter);
// app.get('/', (req, res) => {
//   res.render(
//     'index',
//     {
//       nav: [{ link: '/portfolio', title: 'Portfolio' },
//       { link: '/contact', title: 'Contact' }],
//     }
//   );
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});


// const http = require('http');
// const fs = require('fs');

// fs.readFile('./views/index.html', (err, html) => {
//   if (err) {
//     throw err;
//   }
//   http.createServer((request, response) => {
//     response.writeHeader(200, {"Content-Type": "text/html"});
//     response.write(html);
//     response.end();
//   }).listen(3000);
// });
// console.log('listening on port 3000...');