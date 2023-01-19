const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username:{
        type: String,
        reqired: true,
    },
    email:{
        type: String,
        required: false,
    }
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel