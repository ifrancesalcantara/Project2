const mongoose = require("mongoose")
const unique = require("uniq")
const Schema = mongoose.Schema


const commentSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: false},
    location: {
        lat: {type: mongoose.Decimal128, required: true},
        lng: {type: mongoose.Decimal128, required: true}
    },
    creatorId: {type: String, required: true, ref: "User"},
    type: {type: String, default: ""} //Te be changed to required. default for testing 
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment;