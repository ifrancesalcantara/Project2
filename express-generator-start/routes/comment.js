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
            console.log("hi");
            
            User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comment._id}})
                .populate("comments")
                .then( (updatedUser) => {
                    if(updatedUser.session=="Public") {
                        console.log("public");
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
                        console.log("private");
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