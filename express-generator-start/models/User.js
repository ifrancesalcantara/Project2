const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        // lng: {type: mongoose.Decimal128/*, required: true*/},
        // lat: {type: mongoose.Decimal128/*, required: true*/},
    },
    comments: []
})

const User = mongoose.model("User", userSchema)

module.exports = User