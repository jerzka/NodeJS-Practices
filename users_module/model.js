const { getConnection, Schema, mongoose } = require('../db/mongoose');
getConnection();

const userModel = mongoose.model('Users', new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+$/g, 'invalid email format'],
        min: 4,
        max: 255
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 4,
        max: 255
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})
);

userModel.hash = (password) => {}
//userModel.comparePaswords();

module.exports = userModel;
