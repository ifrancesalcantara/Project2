<<<<<<< HEAD
const mongoose = require("mongoose")
=======
const mongoose = require("mongoose");

>>>>>>> feat
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        lng: {type: Number, required: true},
        lat: {type: Number, required: true},
    },
    comments: [ { type: Schema.Types.ObjectId, ref: 'Comment'} ]
})

const User = mongoose.model("User", userSchema)

module.exports = User