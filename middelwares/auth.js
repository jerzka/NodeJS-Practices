const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY";

const auth = async(req, res, next) =>{
    const cookies = req.cookies;
        try{
            const verified = await jwt.verify(cookies.token, SECRET_KEY);
            if(verified && verified.userId){
                req.userId = verified.userId;
                next();
            }
            else{
                throw "invalid user"            
            }
        } catch (error){
            res.status(401).redirect('/login');
            res.end();
            return;
        }
}

const createToken = async(userId) => {
    return await jwt.sign({
        userId: user.id},
        SECRET_KEY,
        {expiresIn: "1h"})
}

module.exports ={
    auth,
    createToken
}