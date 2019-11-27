var express = require('express');
var router = express.Router();
const Comment = require('./../models/Comment');
const Reply = require('./../models/Reply');

/* GET users listing. */
router.post('/:_id', function(req, res, next) {
    // console.log(req.body, req.params);
    
    if (req.session.currentUser) {
        const { _id } = req.params
        Comment.findById(_id)
            .then( (commentToUpdate) => {
                // console.log("commentToUpdate", commentToUpdate)
                const { text, date, currentLikes } = req.body
                
                Reply.create({ text, creatorUsername: req.session.currentUser.username, date })
                    .then( (newReply) => {
                        // console.log("newReply", newReply)

                        Comment.findByIdAndUpdate(_id, {$push: {replies: newReply._id}})
                            .then( (notYetUpdatedUser) => {

                                Comment.findById(_id)
                                    .populate("replies")
                                    .populate("creatorId")
                                    .then( (reallyUpdatedComment) => {
                                        reallyUpdatedComment["currentUserUsername"] = req.session.currentUser.username 
                                        reallyUpdatedComment["currentLikes"] = currentLikes
                                        res.render('secure/comment', reallyUpdatedComment);
                                    })
                                    .catch( (err) => console.log(err));
                            })
                            .catch( (err) => console.log(err));
                    })
                    .catch( (err) => console.log(err));
            })
            .catch( (err) => console.log(err));
    }
    else {
    res.render("index", {errorMessage: "Session ended."})
    }
});

router.post('/delete/:replyId/:commentId', (req, res)=>{
    if (req.session.currentUser) {
        const {replyId, commentId} = req.params
        Comment.findById(commentId)
            .then( () => {
                Reply.findByIdAndDelete(replyId)
                    .then( () => {
                        Comment.findById(commentId)
                            .then( () => {
                                Comment.findById(commentId)
                                    .populate("replies")
                                    .populate("creatorId")
                                    .then( (reallyUpdatedComment) => {
                                        reallyUpdatedComment["currentUserUsername"] = req.session.currentUser.username 
                                        res.render('secure/comment', reallyUpdatedComment);
                                    })
                                    .catch( (err) => console.log(err));
                            })
                            .catch( (err) => console.log(err));
                    })
                    .catch( (err) => console.log(err));
            })
            .catch( (err) => console.log(err));
    }
    else {
    res.render("index", {errorMessage: "Session ended."})
    }
});

module.exports = router;
