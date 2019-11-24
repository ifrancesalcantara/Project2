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
                const { text, creatorUsername, date } = req.body
                // console.log(req.body);
                
                Reply.create({ text, creatorUsername, date })
                    .then( (newReply) => {
                        // console.log("newReply", newReply)

                        Comment.findByIdAndUpdate(_id, {$push: {replies: newReply._id}})
                            .then( (notYetUpdatedUser) => {

                                Comment.findById(_id)
                                    .populate("replies")
                                    .then( (reallyUpdatedComment) => {
                                            console.log(reallyUpdatedComment)
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