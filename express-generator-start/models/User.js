const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        lat: {type: mongoose.Decimal128},
        long: {type: mongoose.Decimal128},
        // lat: {type: mongoose.Decimal128, required: true},
        // long: {type: mongoose.Decimal128, required: true},
    },
    comments: []
})

const User = mongoose.model("User", userSchema)

module.exports = User