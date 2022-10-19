const userModel = require('./model')

const storeUser = async (userData) => {
    const user = new userModel(userData);
    try {
        await user.save();
    } catch(err) {
        throw 'failed to create user, please check your input'
    }
}

module.exports = {
    storeUser
}