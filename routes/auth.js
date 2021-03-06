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
        if(userData) {
            const hashedPass = userData.password;
            const passwordCorrect = bcrypt.compareSync(password, hashedPass)
            if (passwordCorrect) {
                let userComments
                
                if(userData.session=="Public") {
                    const allUserComments = [];                
                    User.find({})
                    .populate("comments")
                    .then( (allUsersArr) => {
                        allUsersArr.forEach(user=>{
                            user.comments.forEach(comment=>{
                                if(comment.public == false) {
                                    if(comment.creatorId == req.session.currentUser._id){
                                        allUserComments.push(comment)
                                    }
                                } else {
                                    allUserComments.push(comment)
                                }
                            })
                        })
                        userComments = allUserComments.map(comment=> {return {comment}})
                        
                        const currentLocation = {
                            lng: {$numberDecimal: userData.defaultLocation.lng},
                            lat: {$numberDecimal: userData.defaultLocation.lat},
                        }
                        const data = {
                            homeCoords: JSON.stringify(userData.defaultLocation),
                            currentLocation: JSON.stringify(currentLocation),
                            userComments: JSON.stringify(userComments),
                            currentUser: JSON.stringify(userData._id),
                            mapStyle: userData.mapStyle
                        }
                        res.render("secure/map", data)
                    })
                    .catch( (err) => console.log(err));
                } else if (userData.session=="Private") {
                    
                    userComments = userData.comments.map(comment=> {return {comment}})
                    const currentLocation = {
                        lng: {$numberDecimal: userData.defaultLocation.lng},
                        lat: {$numberDecimal: userData.defaultLocation.lat},
                    }
                    const data = {
                        homeCoords: userData.defaultLocation,
                        currentLocation: JSON.stringify(currentLocation),
                        userComments: JSON.stringify(userComments),
                        currentUser: JSON.stringify(userData._id),
                        mapStyle: userData.mapStyle
                    }
                    res.render("secure/map", data)
                }
                req.session.currentUser = userData;

            } else {
                res.render("index", {errorMessage: "Incorrect password."})
            }
            return
        }
        else {
            res.render("index", {errorMessage: "Incorrect username."})
        }})
    .catch(err=>{
        res.render("index", {errorMessage: "Something went wrong"})
        console.log(err)
    })                   
})

//Pass geolocation parameters to center signup map
router.post('/signupDisplay', function(req, res) {
    res.render('auth-views/signup', req.body)
});

router.post('/signup', function(req, res) {   
    const { username, password, passConf, defaultLocation, mapStyle } = req.body;
    
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
                    User.create({username, password:hashedPassword, defaultLocation: {lng, lat}, comments: [], session: "Public", mapStyle: 'mapbox://styles/mapbox/streets-v9'})
                        .then(newUser=>{
                            req.session.currentUser = newUser;
                            // console.log("mapstyle in creation: ", newUser.mapStyle)
                            //CREATE HOME COMMENT
                            Comment.create({ title:"HOME", location: {lng, lat}, creatorId: req.session.currentUser._id, type:"home", public: false})
                                .then( homeComment => {
                                    /*const data = {
                                        homeCoords: comment.location,
                                        currentLocation: JSON.stringify(comment.location),
                                        userComments: JSON.stringify(comment)
                                    }*/
                                    User.find({})
                                    .populate("comments")
                                    .then( (allUsersArr) => {
                                        const allUserComments=[]
                                        allUserComments.push(homeComment)
                                        allUsersArr.forEach(user=>{
                                            user.comments.forEach(comment=>{
                                                if(comment.public == false) {
                                                    if(comment.creatorId == req.session.currentUser._id){
                                                        allUserComments.push(comment)
                                                    }
                                                } else {
                                                    allUserComments.push(comment)
                                                }
                                            })
                                        })
                                        userComments = allUserComments.map(comment=> {return {comment}})
                                        
                                        const currentLocation = {
                                            lng: {$numberDecimal: newUser.defaultLocation.lng},
                                            lat: {$numberDecimal: newUser.defaultLocation.lat},
                                        }
                                        const data = {
                                            homeCoords: newUser.defaultLocation,
                                            currentLocation: JSON.stringify(homeComment.location),
                                            userComments: JSON.stringify(userComments),
                                            currentUser: JSON.stringify(newUser._id),
                                            mapStyle: newUser.mapStyle

                                        }
                                        res.render("secure/map", data)
                                    })
                                    /*console.log(data.userComments);
                                    
                                    res.render('secure/map', data)*/

                                    //PUSH THAT HOME COMMENT ID TO USER COMMENTS 
                                    User.findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: homeComment._id}})
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