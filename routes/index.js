var express = require('express');
var router = express.Router();
const User = require('./../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log(req.session);
  
  

  if(req.session.currentUser){
    console.log("cookie detected");
    
    User.findOne({_id: req.session.currentUser._id}) //CHANGE WHEN TIME TO MATCHING
    .then( (user)=> {

        const data = {
          homeCoords: user.defaultLocation,
          userCommentCoords: 0
        };
        res.render('secure/map', data)
        })
    return;
  }
  console.log("no cookie");
  
  res.render('index');
});

module.exports = router;
