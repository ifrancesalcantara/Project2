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
    console.log("actual session", actualSession);
    let nextSession
    if(actualSession=="Public"){        
        nextSession="Private"
    } else {nextSession="Public"}
    console.log("changing to ", nextSession);
    
    User.findByIdAndUpdate({_id: req.session.currentUser._id}, {session: nextSession})
    .then( (notUpdatedUser) => {
        User.findById(req.session.currentUser._id)
            .then( (realluUpdatedUser) => {
                res.render('secure/profile', realluUpdatedUser)
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
            console.log(e);
            
            User.findById(req.session.currentUser._id)
                .then((userUpdated) => {
                    res.render('secure/profile', userUpdated)
                })
                .catch((err) => console.log(err))
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
    .then( () => {
        console.log('secure/profile/picture', req.session.currentUser.picture);
        if (req.session.currentUser) {
            
            res.render('secure/profile/picture', req.session.currentUser)
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
                    console.log('////>>>>>>>>>>>>>>>>>>>>>>////////');
                    
                res.render("index", {errorMessage: "Session ended."})
                }
        })
        .catch((err) => console.log(err) ) 
})


module.exports = router;