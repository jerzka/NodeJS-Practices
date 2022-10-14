const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.send({messages: 'Something get wrong!'});
    }
}

app.get('/api/user/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
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
        res.status(404).send({message:""});
    }
    else{
        res.send(user);
    }
})

module.exports = { 
    getUsers
}