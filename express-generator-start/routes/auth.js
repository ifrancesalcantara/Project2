var express = require('express');
var router = express.Router();
var User = require("./../models/User")


/* GET home page. */
router.get('/signup', function(req, res) {
  res.render('auth-views/signup');
});

router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    User.create({username, password}).find({}).then(allusers=>console.log(allusers))
    
    res.render("index")
})

module.exports = router;