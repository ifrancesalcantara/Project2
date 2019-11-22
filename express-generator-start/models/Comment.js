const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    location: {
        lat: {type: mongoose.Decimal128, required: true},
        lng: {type: mongoose.Decimal128, required: true}
    },
    creatorId: {type: String, required: true}
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment;