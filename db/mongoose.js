const mongoose = require('mongoose');
require('dotenv').config();

let connection = undefined;
console.log(process.env.API_KEY);

const getConnection = async() =>{
    if(connection) {
        console.log("returning existing connection");
        return connection;
    }
    else{
        console.log("create new connection")
        connection = await mongoose.connect(process.env.API_KEY);
        return connection;
    }
}

module.exports = {getConnection, mongoose, Schema: mongoose.Schema};