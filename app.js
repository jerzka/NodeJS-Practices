const express = require("express");
const path = require("path");
const products = require('./products');

const app = express();
const port = 3002;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


//console.log('directory-name', __dirname+'/client/index.js');

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('/signup', (req, res) => {
    res.sendFile(__dirname +'/client/signup.html');
});

app.post('/singup', (req, res) => {

}); 

app.get('/signin', (req, res) => {
    res.sendFile(__dirname +'/client/signin.html');
});

app.post('/singin', (req, res) => {

}); 


// app.post('/login', async (req, res) => {
//     const userInfo = req.body;
//     let loogedIn = false;
//     await if(userInfo.){
        
//     }
// });

app.get('/home', (req, res) => {
    res.sendFile(__dirname +'/client/home.html');
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
