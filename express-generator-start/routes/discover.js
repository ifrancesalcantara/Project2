var express = require('express');
var router = express.Router();
const User = require('./../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.currentUser){

    User.find({}) //CHANGE WHEN TIME TO MATCHING
    .populate("comments")
    .then( (allUsers)=> {
        const allComments = []
        allUsers.forEach(user=>{
            user.comments.forEach(comment=>{
                allComments.push(comment)
            })
        })
        const data = {
          allCommentData: JSON.stringify(allComments),
          currentUserId: req.session.currentUser._id
        };
        res.render('secure/discover', data)
        })
    return;
  }
  
  res.render('index');
});

module.exports = router;
