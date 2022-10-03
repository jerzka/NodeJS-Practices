import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsArray from './products.js';

const app = express();
const port = 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('directory-name', __dirname+'/client/index.js');

app.use(express.static('public'));

app.get('/homeJs', (req, res) => {
    res.sendFile(__dirname + '/client/index.js');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/client/index.html');
});

app.get('/products', (req, res) => {
    res.json(productsArray);
});

// app.get('*', (req, res) => {
//     res.sendFile(__dirname +'/client/404.html');
// });
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname +'/client/404.html');
});

app.listen(port, () => {
    console.log('Listening from port 3002');
});