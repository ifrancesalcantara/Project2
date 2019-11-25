const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: false},
    location: {
        lat: {type: mongoose.Decimal128, required: true},
        lng: {type: mongoose.Decimal128, required: true}
    },
    creatorId: {type: String, required: true, ref: "User"},
    creatorUsername: String,
    type: {type: String, default: ""}, //Te be changed to required. default for testing 
    public: {type: Boolean},
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: "Reply"}],
    likes: Array
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment;