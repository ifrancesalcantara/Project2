var express = require('express');
var router = express.Router();
const User = require('./../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log(req.session);
  

  if(req.session.currentUser){
    console.log("cookie dected");
    
    User.findOne({_id: req.session.currentUser._id}) //CHANGE WHEN TIME TO MATCHING
    .then( (user)=> {

        const userHomeLocation = user.defaultLocation;
        console.log("coords for /map: ", userHomeLocation)
        res.render('secure/map', userHomeLocation)
        })
    return;
  }
  console.log("no cookie");
  
  res.render('index');
});

module.exports = router;
