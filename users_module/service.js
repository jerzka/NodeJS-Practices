const userModel = require('./model');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const { createToken } = require('../middelwares/auth');

const storeUser = async (userData) => {
    //const user = new userModel(userData);
    try {
        console.log("from storeUser "+userData.password);
        const password = await bcrypt.hashSync(userData.password, 10);
        console.log("po szyfrowaniu "+password);
        const user = new userModel({
            ...userData, 
            password //nadpisuje propertę password???
        });
        console.log("user to model "+ user);
        await user.save();
    } catch(err) {
        throw {
            msg: 'failed to create user, please check your input',
            code: 400
        }
    }
    
}

const login = async (userData) => {
    try{
        const user = await userModel.findOne({
            email: userData.email
        });
        if(!user){
            throw{
                msg: "Invalid login information",
                code: 404
            }        
        }
        const passwordMatch = bcrypt.compare(userData.password, user.password);
        if(!passwordMatch){
            throw{
                msg: "Invalid login information",
                code: 400 //401?
            }
        }
        const token = await createToken(user.id);
        // const token = await jwt.sign({
        //     userId: user.id},
        //     "SECRET_KEY",
        //     {expiresIn: "1h"})
        return { userId: user.id, token}; 
    }catch(error){
            throw error;
        }
}
module.exports = {
    storeUser
}