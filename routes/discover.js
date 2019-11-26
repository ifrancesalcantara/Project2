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

        function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;
        
          // While there remain elements to shuffle...
          while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
        
          return array;
        }
        
        const data = {
          allCommentData: JSON.stringify(shuffle(allComments).splice(0, 50)),
          currentUserId: req.session.currentUser._id
        };
        res.render('secure/discover', data)
        })
    return;
  }
  
  res.render('index');
});

module.exports = router;
