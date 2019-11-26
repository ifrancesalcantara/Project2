const mongoose = require("mongoose")
const Schema = mongoose.Schema


const LocalCommentColSchema = new Schema({
    countryCol: {
        country: {
            name: {type: String, required: true},
            comments: [Object]
        }
    }
})

const LocalCommentCol = mongoose.model("LocalCommentCol", LocalCommentColSchema)

module.exports = LocalCommentCol;