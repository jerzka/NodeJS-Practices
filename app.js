const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { engine } =require("express-handlebars");
const { getConnection } = require("./db/mongoose");
const userService = require('./users_module/service');
const {auth} = require('./middelwares/auth');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3002;

//app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
    }));   

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/public')));
app.use(cookieParser());

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
        res.status(err.code).json({
            error: err.msg
        })
        return;
    }
    res.status(200).json({
         message: "user created sucessfully"
    });
});

app.post('/login', async (req, res) =>{
    const body = req.body;

    if(!body.email || !body.password || !body.inludes('@') || body.password.length === 0)
    {
        res.status(400).json({
            error: "blad"
        });
        return;
    }
    try{
        const {userId, token} = await userService.login(body);
        if(userId && token){
            //res.cookie('token', token)
            res.set('authorization', token);
            res.status(200).json({
                userId,
                token
            })
        }
    } catch(err){
        res.status(err.code).json({
            error: err.message
        });

    }
})

app.get('/user', (req, res) => {
    res.render('profile', {
        name: "Kate"
    })
});
app.get('dashboard', auth, async (req, res) => {
    try{
        const user = await userService.getUserById(req.userId);
        res.render('profile', {
            layout: 'profile',
            name: user.name,
            email: user.email
        })
    } catch (err){
    // const cookies = req.cookies;
    // console.log(cookies);
    // if(cookies.token){
    //     const verified = 
    }
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
