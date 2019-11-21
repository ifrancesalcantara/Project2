var express = require('express');
var router = express.Router();
var User = require("./../models/User")


router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    User.find({username, password})
    .then(user=>{
        res.render("secure/map")
    })
    
})

/* GET home page. */
router.get('/signup', function(req, res) {
  res.render('auth-views/signup')
});

router.post('/signup', function(req, res) {
    const { username, password } = req.body;
    User.find({username})
    .then(user=>{
        if(!user){
            User.create({username, password})
            .then(newUser=>console.log(newUser))
            res.render("secure/map")
        } else {
            res.render("auth-views/signup", {errorMessage: "Username already exists."})
        }
    })
});


module.exports = router;