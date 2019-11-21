const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        lat: mongoose.Decimal128,
        long: mongoose.Decimal128
    },
    comments: []
})

const User = mongoose.model("User", userSchema)

module.exports = User