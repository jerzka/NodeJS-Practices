const mongoose = require('mongoose');
const { API_KEY } = require('../config');
const { env } = require("process");

let connection = undefined;

const getConnection = async() =>{
    if(connection) {
        console.log("returning existing connection");
        return connection;
    }
    else{
        console.log("create new connection")
        connection = await mongoose.connect(env.API_KEY);
        return connection;
    }
}

module.exports = {getConnection, mongoose, Schema: mongoose.Schema};