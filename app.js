const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { getConnection } = require("./db/mongoose");

const userService = require('./users_module/service');
const port = 3002;

//app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname +'/client/index.html');
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/signin.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/signup.html'));
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        await userService.storeUser(req.body);
    } catch(err) {
        res.status(400).json({
            error: err
        })
        return;
    }
    res.status(200).json({
         message: "user created sucessfully"
    });

});

app.get('/home', (req, res) => {
    res.sendFile(__dirname +'/client/home.html');
});

app.get('/logout', (req, res) => {
    loggedIn = false;
    res.redirect('/signin');
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

app.listen(port, async() => {
    console.log('Listening from port 3002');
    await getConnection();
    console.log("Connected to MongoDB");
});

module.exports = app;
