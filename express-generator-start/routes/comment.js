const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{
    if (req.session.currentUser) {
        res.render('secure/comment');
    }
    else {
    res.render("index", {errorMessage: "Session ended."})
    }
})


router.get("/:commentId", (req, res)=>{
    Comment.findById(req.params.commentId)
    .populate("creatorId")
    .then( (data) => {{
        if (req.session.currentUser) {            
            res.render('secure/comment', data);
        }
        else {
        res.render("index", {errorMessage: "Session ended."})
        }
    }})
    .catch( (err) => {
        console.log(err)
        User.findById(req.session.currentUser._id)
        .populate("comments")
        .then(userData=>{
            userComments = userData.comments.map(comment=> {return {comment}})
            const data = {
                homeCoords: userData.defaultLocation,
                userComments: JSON.stringify(userComments)
            }
            res.render("secure/map", data)
        })
    });


})


router.post('/', (req, res) => {
    
    User.findOne({_id: req.session.currentUser._id})
    .then(user=>{
        let public
        if(req.body.privateOrPublic == "Public") {
            public = true
        } else {
            public = false
        }
        
        const  { title, text, lng, lat} =  req.body;
        Comment.create({ title, text, location: {lng, lat}, creatorId: req.session.currentUser._id, public})
        .then( comment => {
            User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comment._id}})
                .populate("comments")
                .then( (updatedUser) => {
                    if(updatedUser.session=="Public") {
                        const allUserComments = [];                
                        User.find({})
                        .populate("comments")
                        .then( (allUsersArr) => {
                            allUsersArr.forEach(user=>{
                                user.comments.forEach(comment=>{
                                    allUserComments.push(comment)
                                })
                            })
                            userComments = allUserComments.map(comment=> {return {comment}})
                            const data = {
                                homeCoords: updatedUser.defaultLocation,
                                userComments: JSON.stringify(userComments)
                            }
                            res.render("secure/map", data)
                        })
                        .catch( (err) => console.log(err));
                    } else if (updatedUser.session=="Private") {
                        userComments = updatedUser.comments.map(comment=> {return {comment}})
                        const data = {
                            homeCoords: updatedUser.defaultLocation,
                            userComments: JSON.stringify(userComments)
                        }
                        res.render("secure/map", data)
                    } else {
                        res.render("secure/map")
                    }
                })
                .catch( (err) => console.log(err));  
        })
        .catch( err => console.log(err))
                
    })
    .catch(err=>console.log(err))
})


module.exports = router;