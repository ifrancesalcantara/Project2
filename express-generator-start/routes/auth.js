var express = require('express');
var router = express.Router();
var User = require("./../models/User")


router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    User.find({username, password})
    .then(userData=>{
        req.session.currentUser = userData;
        res.render("secure/map")
    })
    
})

/* GET home page. */
router.get('/signup', function(req, res) {
  res.render('auth-views/signup')
});

router.post('/signup', function(req, res) {    
    const { username, password, passConf} = req.body;
    
    if (username==="") {
        res.render("auth-views/signup", {errorMessage: "Please provide a username."})
    } 
    
    else {
        User.find({username})
        .then(undefined=>{
            if(undefined) {
                if(password==="") {
                    res.render("auth-views/signup", {errorMessage: "Password must not be empty."})
                } else if (password.split("").length < 8) {
                    res.render("auth-views/signup", {errorMessage: "Password must be 8 characters long at least."})
                } else if (passConf === password) {
                    User.create({username, password})
                    .then(newUser=>console.log(newUser))
                    res.render("secure/map")
                } else {
                    res.render("auth-views/signup", {errorMessage: "Password is not the same."})
                }
            } else {
                res.render("auth-views/signup", {errorMessage: "Username already exists."})
            }
        })
    }
});


module.exports = router;