const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(routes);


const hostname = '127.0.0.1';
const port = 3007;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
