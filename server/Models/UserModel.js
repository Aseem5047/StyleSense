const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    profilePicture: String,
    about: String,
    themeSelected: String,
    colorSelected: String,

},
    { timestamps: true }
)

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel;