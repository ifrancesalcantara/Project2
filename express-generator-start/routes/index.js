var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log(req.session);
  

  // if(req.session.currentUser){
  //   console.log("cookie dected");
    
    
  //   res.render("secure/map");
  //   return;
  // }
  console.log("no cookie");
  
  res.render('index');
});

module.exports = router;
