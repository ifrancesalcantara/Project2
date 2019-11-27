var express = require('express');
var router = express.Router();
const User = require('./../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.currentUser){

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
  
  res.render('index');
});

module.exports = router;
