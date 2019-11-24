const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const replySchema = new Schema({
    text: String,
    image_url: String,
    creatorUsername: String,
    date: String
});

const Reply = mongoose.model( "Reply", replySchema);

module.exports = Reply;