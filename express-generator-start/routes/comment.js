const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{
    console.log("in comment get");

    if (req.session.currentUser) {
        res.render('secure/comment');
    }
    else {
    res.render("index", {errorMessage: "Session ended."})
    }
})


router.post('/', (req, res) => {
    
    User.findOne({_id: req.session.currentUser._id})
        .populate("comments")
        .then(user=>{
            const  { title, text, lng, lat} =  req.body;
            Comment.create({ title, text, location: {lng, lat}, creatorId: req.session.currentUser._id})
                .then( comment => {
                    const userCommentCoords = user.comments.map(comment=> {return {lng: comment.location.lng, lat: comment.location.lat}})
                    console.log(userCommentCoords);
                    
                    const data = {
                        homeCoords: comment.location,
                        userCommentCoords: JSON.stringify(userCommentCoords)
                    }
                    res.render('secure/map', data)
                    
                    User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comment._id}})
                        .then( (data) => {return})
                        .catch( (err) => console.log(err));  
                })
                .catch( err => console.log(err))


        })
        .catch(err=>console.log(err))
})


module.exports = router;