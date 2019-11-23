const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        lng: {type: Number, required: true},
        lat: {type: Number, required: true},
    },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment"} ]
})

const User = mongoose.model("User", userSchema);

module.exports = User;