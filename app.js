const express = require("express");
const path = require("path");
const products = require('./products');
// const { getUsers } = require('controllers/user.controller')
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://jerzka:jerzkaDB23@katemongodb.roxoohv.mongodb.net/?retryWrites=true&w=majority') // link
    .then(() => console.log('Connect to MongoDB'))
    .catch(err => console.error(err));

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const port = 3002;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const users = [];
let loggedIn = false;

//console.log('directory-name', __dirname+'/client/index.js');

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('/signup', (req, res) => {
    res.sendFile(__dirname +'/client/signup.html');
});

app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.send({messages: 'Something get wrong!'});
    }
})//getUsers);

app.get('/api/user/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.send(user);
    }
    catch(err){
        res.send({messages: 'Something get wrong!'})
    }
});

app.post('/api/users/register', async (req, res) => {
    let newUser = await new User(req.body);
    newUser = await newUser.save();
    console.log(newUser);
    res.send(newUser);
    return
})

app.patch('/api/user/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    user = await user.updateOne({"email":"newemil@com.com"});
    req.send(user);
    return
})

app.delete('/api/user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        res.status(404).send({message:"User not found"});
    }
    else{
        res.send(user);
    }
})

app.post('/signup', urlencodedParser, (req, res) => {
    const newId = users.length === 0 ? 0 : users[users.length - 1].id + 1;
    const newUser = {
      id: newId,
      user: req.body.userInput,
      email: req.body.emailInput,
      password: req.body.passwordInput
    };
  
    users.push(newUser);
    //res.send(users);
    res.redirect("/signin");
  
  });

app.get('/signin', (req, res) => {
    res.sendFile(__dirname +'/client/signin.html');
});

app.post('/signin', urlencodedParser, (req, res) => {
    const userInfo = req.body;

    if(users.findIndex((x) => (x.user === userInfo.userInput && x.password === userInfo.passwordInput ))){
        loggedIn = true;
        res.redirect("/home");
    }
    else {
        res.send("Acces denied");
    }
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname +'/client/home.html');
});

app.get('/logout', (req, res) => {
    loggedIn = false;
    res.redirect('/signin');
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
