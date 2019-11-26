const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');
const Reply = require('./../models/Reply');
const LocalCommentCol = require('./../models/Reply');

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
    .populate("replies")
    .then( (data) => {{
        if (req.session.currentUser) {   
            data["currentUserUsername"] = req.session.currentUser.username;
            data["currentLikes"] = data.likes.length
                        
            res.render('secure/comment', data);
        }
        else {
        res.render("index", {errorMessage: "Session ended."})
        }
    }})
    .catch( (err) => {
        console.log("idn't find comment");
        
        console.log(err)
        User.findById(req.session.currentUser._id)
        .populate("comments")
        .then(userData=>{
            userComments = userData.comments.map(comment=> {return {comment}})
            const data = {
                homeCoords: userData.defaultLocation,
                userComments: JSON.stringify(userData.userComments),
                currentLocation: JSON.stringify(userData.currentLocation),
                userComments: JSON.stringify(userComments),
            }
            
            res.render("secure/map", data)
        })
    });


})


router.post('/', (req, res) => {
    console.log(req.body);
    
    User.findOne({_id: req.session.currentUser._id})
    .then(user=>{
        let public
        if(req.body.privateOrPublic == "Public") {
            public = true
        } else {
            public = false
        }
        
        const  { title, text, lng, lat, type } =  req.body;
        
        Comment.create({ title, text, location: {lng, lat}, creatorId: req.session.currentUser._id, creatorUsername: req.session.currentUser.username, public, type, likes: [], date: new Date() })
        .then( comment => {
            console.log(comment);
            
            User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comment._id}})
                .populate("comments")
                .then( (notYetUpdatedUser) => {
                    User.findById(req.session.currentUser._id)
                    .populate("comments")
                    .then( (updatedUser) => {
                        //LocalCommentCol.create({})    Not time to do load chunks.
                        //console.log(notYetUpdatedUser.ubication);
                        
                        if(updatedUser.session=="Public") {
                            const allUserComments = [];                
                            User.find({})
                            .populate("comments")
                            .then( (allUsersArr) => {
                                allUsersArr.forEach(user=>{
                                    user.comments.forEach(comment=>{
                                        if(comment.public == false) {
                                            if(comment.creatorId == req.session.currentUser._id){
                                                allUserComments.push(comment)
                                            }
                                        } else {
                                            allUserComments.push(comment)
                                        }
                                    })
                                })
                                userComments = allUserComments.map(comment=> {return {comment}})
                                const data = {
                                    homeCoords: updatedUser.defaultLocation,
                                    currentLocation: JSON.stringify(comment.location),
                                    userComments: JSON.stringify(userComments),
                                    currentUser: JSON.stringify(req.session.currentUser._id)
                                }
                                res.render("secure/map", data)
                            })
                            .catch( (err) => console.log(err));


                        } else if (updatedUser.session=="Private") {
                            userComments = updatedUser.comments.map(comment=> {return {comment}})
                            const data = {
                                homeCoords: updatedUser.defaultLocation,
                                currentLocation: JSON.stringify(comment.location),
                                userComments: JSON.stringify(userComments),
                                currentUser: JSON.stringify(req.session.currentUser._id)
                            }
                            res.render("secure/map", data)


                        } else {
                            res.render("secure/map")
                        }
                    })
                    .catch( (err) => console.log(err));
                })
                .catch( (err) => console.log(err));  
        })
        .catch( err => console.log(err))
                
    })
    .catch(err=>console.log(err))
})

router.post('/delete/:_id', (req, res) => {
    Comment.findById(req.params._id)
        .then( (commentToDelete) => {
            const currentLocation = commentToDelete.location 
            console.log(commentToDelete.replies)
            commentToDelete.replies.forEach(replyId=>{
                Reply.findByIdAndDelete(replyId)
                .then( (deletion) => console.log(deletion))
                .catch( (err) => console.log(err));
            })
            setTimeout(()=>{
                Comment.findByIdAndDelete(req.params._id)
                    .then( (deletion) => {
                        console.log(deletion)
                        User.findById(req.session.currentUser)
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
                                        currentLocation: JSON.stringify(currentLocation),
                                        userComments: JSON.stringify(userComments),
                                        currentUser: JSON.stringify(req.session.currentUser._id)

                                    }
                                    res.render("secure/map", data)
                                })
                                .catch( (err) => console.log(err));
    
    
                            } else if (updatedUser.session=="Private") {
                                userComments = updatedUser.comments.map(comment=> {return {comment}})
                                const data = {
                                    homeCoords: updatedUser.defaultLocation,
                                    currentLocation: JSON.stringify(commentToDelete.location),
                                    userComments: JSON.stringify(userComments),
                                    currentUser: JSON.stringify(req.session.currentUser._id)
                                }
                                res.render("secure/map", data)
    
    
                            } else {
                                res.render("secure/map")
                            }
                        })
                        .catch( (err) => console.log(err));
                    })
                    .catch( (err) => console.log(err));
            })
        })
        .catch( (err) => console.log(err));
    
    
})


router.post("/like/:commentId/:username", (req, res)=>{
    const {commentId, username} = req.params
    Comment.findById(commentId)
    .then( (comment) => {
        if (comment.likes.indexOf(username)>-1) {
            console.log("already liked, see: ", comment.likes);
            Comment.findByIdAndUpdate(commentId, {$pull: {likes: username}})
                .then( (notYetUpdatedComment) => {
                    Comment.findById(commentId)
                        .populate("creatorId")
                        .populate("replies")
                        .then( (data) => {{
                            if (req.session.currentUser) {   
                                data["currentUserUsername"] = req.session.currentUser.username 
                                data["currentLikes"] = data.likes.length
                                    
                                res.render('secure/comment', data);
                            }
                            else {
                            res.render("index", {errorMessage: "Session ended."})
                            }
                        }})       
                    })
                    .catch( (err) => {console.log(err)});
        } else {
            console.log("not yet liked, see: ", comment.likes);
            User.find({username})
            .then( (user) => {
                Comment.findByIdAndUpdate(commentId, {$push: {likes: username}})
                .then( (notYetUpdatedComment) => {
                    Comment.findById(commentId)
                        .populate("creatorId")
                        .populate("replies")
                        .then( (data) => {{
                        console.log("already liked, see: ", data.likes);

                        console.log("already liked, see: ", notYetUpdatedComment.likes);
                            if (req.session.currentUser) {   
                                data["currentUserUsername"] = req.session.currentUser.username 
                                data["currentLikes"] = data.likes.length
                                    
                                res.render('secure/comment', data);
                            }
                            else {
                            res.render("index", {errorMessage: "Session ended."})
                            }
                        }})                  
                })
                .catch( (err) => {console.log(err)});
            })
            .catch( (err) => console.log(err));
        }
    })
    .catch( (err) => console.log(err));
})

module.exports = router;