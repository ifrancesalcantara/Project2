var express = require('express');
var router = express.Router();
var User = require("/models")

/* GET home page. */
router.get('/signup', function(req, res) {
  res.render('auth-views/signup');
});

router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    
    res.redirect("/")
})

module.exports = router;