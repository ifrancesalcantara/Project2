var express = require('express');
var router = express.Router();
var User = require("./../models/User")


router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    if(req.session.currentUser){
        res.render("secure/map")
    } else {
        User.findOne({username, password})
        .then(userData=>{
            if(userData){
                console.log(userData);
                req.session.currentUser = userData;
                res.render("secure/map")
                    }
            else {
                res.render("index", {errorMessage: "Incorrect username or password."})
            }
        })
        .catch(err=>console.log(err))
    }
    
})

/* GET home page. */
router.get('/signup', function(req, res) {
res.render('auth-views/signup')
});

router.post('/signup', function(req, res) {   
    const { username, password, passConf, defaultLocation } = req.body;
    
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
                    const lng = JSON.parse(defaultLocation).lng;
                    const lat = JSON.parse(defaultLocation).lat;
                    
                    
                    User.create({username, password, defaultLocation: {lng, lat} })
                        .then(newUser=>{
                            var userHomeLocation =  newUser.defaultLocation
                            res.render("secure/map", {userHomeLocation}) //Will center map there
                        })
                        .catch(err=>{ //Not catching if nohome selected
                            console.log("error to create user", err);                            
                            res.render("auth-views/signup", {errorMessage: "Click on the map to set your home."})
                        })

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
    res.render("index", {errorMessage: "Session ended."})
    )
})


module.exports = router;