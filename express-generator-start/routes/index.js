var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log(req.session);
  

  if(req.session.currentUser){
    console.log("cookie dected");
    
    console.log('<<<<<<<<<<<>>>>>>>>>>>>', req.session.currentUser);
    
    res.render("secure/map");
    return;
  }
  console.log("no cookie after reload");
  
  res.render('index');
});

module.exports = router;
