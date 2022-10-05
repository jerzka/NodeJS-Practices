const express = require("express");
const path = require("path");
const products = require('./products');

const app = express();
const port = 3002;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


console.log('directory-name', __dirname+'/client/index.js');

app.use(express.static(path.join(__dirname, './client/public')));

app.get('/homeJs', (req, res) => {
    res.sendFile(__dirname + '/client/index.js');
});

app.get('login', (req, res) => {
    res.send("Sign in page");
});

app.get('/register', (req, res) => {
    res.send("Sing up page");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/client/index.html');
});

app.get('/products', (req, res) => {
    res.json(products);
});

// app.get('*', (req, res) => {
//      res.sendFile(__dirname +'/client/404.html');
// });

app.use((req, res) => {
    res.status(404).sendFile(__dirname +'/client/404.html');
});

app.listen(port, () => {
    console.log('Listening from port 3002');
});

module.exports = app;
