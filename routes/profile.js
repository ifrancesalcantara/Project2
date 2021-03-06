const express = require('express');
const  router = express.Router();
const parser = require('../config/cloudinary');

const Comment = require('./../models/Comment');
const User = require('./../models/User');


const zxcvbn = require("zxcvbn");
const bcrypt = require("bcrypt");
const saltRounds = 10;




router.post('/security', (req, res) => {
    const _id = req.session.currentUser._id;
    const   {password, passConf}  =  req.body;
    const currentUser = req.session.currentUser;
    
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
    User.findById({_id: req.session.currentUser._id})
    .then(() =>{
        if ( password === '' ) {
            res.render('secure/profile', {errorMessage: "Password cant be empty"})
        }
        else if (password != passConf) {
            res.render('secure/profile', {errorMessage: "Password and Password Confirm must be the same"})
        }
        else if (password.split('').length < 8) {
            res.render('secure/profile',  {errorMessage: "Password must be at least 8 characters long"})
        }
        else 
        {
            User.findByIdAndUpdate({_id: _id}, {password: hashedPassword}, {new: true})
                    .then( () => {
                        res.render('secure/profile', req.session.currentUser)
                    })
                    .then( () => res.render('secure/profile', req.session.currentUser,))
                    .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err)
            )
})

router.post("/session", (req,res)=>{
    const actualSession = req.body.session
    let nextSession
    if(actualSession=="Public"){        
        nextSession="Private"
    } else {nextSession="Public"}
    
    User.findByIdAndUpdate({_id: req.session.currentUser._id}, {session: nextSession})
    .then( (notUpdatedUser) => {
        User.findById(req.session.currentUser._id)
            .then( (realluUpdatedUser) => {
                res.render('secure/profile/picture', realluUpdatedUser)
            })
            .catch( (err) => console.log(err));
        
    })
    .catch((err) => console.log(err))    
})


router.post('/picture', parser.single('photo'), (req, res) => {
    const image_url = req.file.secure_url;
    
    User.findByIdAndUpdate({_id: req.session.currentUser._id}, {picture: image_url}, {new: true})
    .then( ( data ) => {
        
                res.render('secure/profile', data)
            })
            .catch((err) => console.log(err))
        })
        
router.post('/location', (req, res) => {
    const {defaultLocation} = req.body;
    const lng = JSON.parse(defaultLocation).lng;
    const lat = JSON.parse(defaultLocation).lat;
    

    User.findByIdAndUpdate(req.session.currentUser._id, {defaultLocation: {lng: lng, lat: lat}})
        .then( (e) => {
            User.findById(req.session.currentUser._id)
                .then((userUpdated) => {
                    res.render('secure/profile', userUpdated)
                })
                .catch(err=>{console.log(err)})
        })
        .catch((err)=> console.log(err))
})
        
router.get('/map', (req, res ) => {
    User.findById(req.session.currentUser)
        .then(() => {
            if (req.session.currentUser) {

                // MapStyle.find()
                //     .then( (mapData) => {

                //         res.render('secure/profile/map', mapData)
                //     })
                //     .catch((err) => console.log(err)
                //     )
                res.render('secure/profile/map', req.session.currentUser)
            }
            else {
                res.render('index', {errorMessage: "Session ended."})
            }
        })
        .catch((err) => console.log(err))
    })
    
    router.get('/map/change', (req, res ) => {
        User.findByIdAndUpdate(req.session.currentUser, {mapStyle: req.query.newMap})
        .then((userData) => {
            User.findById(req.session.currentUser)
            .then( (updatedUser) => {
                    
                        // if (req.session.currentUser) {
                        
                        //     // MapStyle.find()
                        //     //     .then( (mapData) => {
                        
                        //     //         res.render('secure/profile/map', mapData)
                        //     //     })
                        //     //     .catch((err) => console.log(err)
                        //     //     )
                        //     const currentLocation = {
                        //         lng: {$numberDecimal: updatedUser.defaultLocation.lng},
                        //         lat: {$numberDecimal: updatedUser.defaultLocation.lat},
                        //     }
                        //     userComments = updatedUser.comments.map(comment=> {return {comment}})
                        //     const data = {
                        //         homeCoords: updatedUser.defaultLocation,
                        //         currentLocation: JSON.stringify(currentLocation),
                        //         userComments: JSON.stringify(userComments),
                        //         currentUser: JSON.stringify(updatedUser._id),
                        //         mapStyle: updatedUser.mapStyle
                        //     }
                        
                        //     res.render('secure/map', data)
                        // }
                        User.findOne({_id: req.session.currentUser._id}) //CHANGE WHEN TIME TO MATCHING
                            .populate("comments")
                            .then( (userData)=> {
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
                                            homeCoords: userData.defaultLocation,
                                            currentLocation: JSON.stringify(currentLocation),
                                            userComments: JSON.stringify(userComments),
                                            currentUser: JSON.stringify(userData._id),
                                            mapStyle: userData.mapStyle
                                        }
                                        res.render("secure/map", data)
                                    })
                                    .catch( (err) => console.log(err));
                                }
                                else {
                                    res.render('index', {errorMessage: "Session ended."})
                                }
                            })
                            .catch((err) => console.log(err))
                })
            })
                .catch( (err) => console.log(err));
            
})
    

router.get('/location', (req, res) => {
    
    User.findById(req.session.currentUser._id)
    .then( () => {
        if (req.session.currentUser) {
            res.render('secure/profile/location', req.session.currentUser)
        }
        else {
            res.render('index', {errorMessage: "Session ended."})
        }
    })
    .catch( (err) => console.log(err))
})

router.get('/security', (req, res ) => {
    
    User.findById(req.session.currentUser._id)
    .then( () => {
        if (req.session.currentUser) {
            res.render('secure/profile/security', req.session.currentUser)
        }
        else{
            res.render('index', {errorMessage: "session ended."})
        }
    })
    .catch((err) => console.log(err))
})

router.get('/picture', (req, res) => {
    
    User.findOne({_id: req.session.currentUser._id} )
    .then( (data) => {
        // console.log('secure/profile/picture', req.session.currentUser.picture);
        if (req.session.currentUser) {
            
            res.render('secure/profile/picture', data)
        }
        else {
            res.render('index', {errorMessage: "session ended"})
        }
    })
    .catch((err) => console.log(err))
})

router.get("/", (req, res)=>{
    User.findById(req.session.currentUser._id)
        .then(() =>{
            if (req.session.currentUser) {
                res.render('secure/profile', req.session.currentUser)
                }
                else {
                    
                res.render("index", {errorMessage: "Session ended."})
                }
        })
        .catch((err) => console.log(err) ) 
})


module.exports = router;