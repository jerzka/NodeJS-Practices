const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let connection = undefined;
console.log(process.env.API_KEY);

const getConnection = async() =>{
    if(connection) {
        console.log("returning existing connection");
        return connection;
    }
    else{
        console.log("create new connection")
        connection = await mongoose.connect('mongodb+srv://vercel-admin-user:qRxgqiUbhswDPmfc@katemongodb.roxoohv.mongodb.net/KateMongoDB?retryWrites=true&w=majority');
        return connection;
    }
}

module.exports = {getConnection, mongoose, Schema: mongoose.Schema};