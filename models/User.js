const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    defaultLocation: {
        lng: {type: Number, required: true},
        lat: {type: Number, required: true},
    },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment"} ],
    hasHome: {type: Boolean, default: false},
    profilepicture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gif"}],
    session: {type: String, default: "Public"},
    picture: {type: String, default: 'https://yt3.ggpht.com/a/AGF-l79vVY0PDSq-nmGEdhOC4FljQAV9uCFX7Dq62A=s900-c-k-c0xffffffff-no-rj-mo'},
    mapStyle: {type: String, default: 'mapbox://styles/mapbox/streets-v9'}
})

const User = mongoose.model("User", userSchema);

module.exports = User;