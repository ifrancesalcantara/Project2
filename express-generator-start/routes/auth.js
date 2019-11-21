var express = require('express');
var router = express.Router();
var User = require("./../models/User")


router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    console.log(req.body);
    if(req.session.currentUser){
        res.render("secure/map")
    }
    User.find({username, password})
    .then(userData=>{
        if(userData){
            req.session.currentUser = userData;
            res.render("secure/map")
        }
        else {
            res.render("index", {errorMessage: "Incorrect username or password."})
        }
    })
    .catch(err=>console.log(err))
    
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

router.get("/logout", (req, res)=>{
    req.session.destroy((err)=>
    {
    console.log(err)
    
    console.log("here");
    // res.render("index", {errorMessage: "Session ended."})
    })
    .then(something=>{
        res.redirect("/")
    })
})

module.exports = router;