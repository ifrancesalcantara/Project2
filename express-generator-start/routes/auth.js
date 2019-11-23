var express = require('express');
var router = express.Router();
var User = require("./../models/User");

var Comment = require("./../models/Comment");

const zxcvbn = require("zxcvbn");
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.post("/login", (req, res)=>{
    const {username, password} = req.body;
   
    User.findOne({username})
    .populate("comments")
    .then(userData=>{
        if(userData){
            const hashedPass = userData.password;
            const passwordCorrect = bcrypt.compareSync(password, hashedPass)
                if (passwordCorrect) {
                    const userComments = userData.comments.map(comment=> {return {comment}})
                    req.session.currentUser = userData;
                    const data = {
                        homeCoords: userData.defaultLocation,
                        userComments: JSON.stringify(userComments)
                    }
                    res.render("secure/map", data)
                } else {
                    res.render("index", {errorMessage: "Incorrect password."})
                }
                return
            }
            else {
                res.render("index", {errorMessage: "Incorrect username."})
            }
        })
    .catch(err=>{
        res.render("index", {errorMessage: "Something went wrong"})
        console.log(err)
    })                   
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
        User.findOne({username})
        .then(user=>{
            if(!user) {

                if(password==="") {
                    res.render("auth-views/signup", {errorMessage: "Password must not be empty."})
                } 
                
                else if (password.split("").length < 8) {
                    res.render("auth-views/signup", {errorMessage: "Password must be 8 characters long at least."})
                } 
                
                else if (passConf === password) {
                    const lng = JSON.parse(defaultLocation).lng;
                    const lat = JSON.parse(defaultLocation).lat;
                    
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashedPassword = bcrypt.hashSync( req.body.password, salt);
                    
                    //CREATE NEW USER
                    User.create({username, password:hashedPassword, defaultLocation: {lng, lat}, comments: [] })
                        .then(newUser=>{
                            req.session.currentUser = newUser;

                            //CREATE HOME COMMENT
                            Comment.create({ title:"HOME", location: {lng, lat}, creatorId: req.session.currentUser._id, type:"home"})
                                .then( comment => {
                                    const data = {
                                        homeCoords: comment.location,
                                        userComments: JSON.stringify(comment)
                                    }
                                    console.log(data.userComments);
                                    
                                    res.render('secure/map', data)

                                    //PUSH THAT HOME COMMENT ID TO USER COMMENTS 
                                    User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comment._id}})
                                        .then( (data) => {return})
                                        .catch( (err) => console.log(err))
                                })
                                .catch(err=>console.log(err))

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