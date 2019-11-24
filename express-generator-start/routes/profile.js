const express = require('express');
const  router = express.Router();
const parser = require('../config/cloudinary');

const Comment = require('./../models/Comment');
const User = require('./../models/User');


const zxcvbn = require("zxcvbn");
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.get("/", (req, res)=>{
    User.findById({_id: req.session.currentUser._id})
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


router.post('/', (req, res) => {
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
    console.log("actual session",actualSession);
    let nextSession
    if(actualSession=="Public"){        
        nextSession="Private"
    } else {nextSession="Public"}
    console.log("changing to ", nextSession);
    
    User.findByIdAndUpdate({_id: req.session.currentUser._id}, {session: nextSession})
            .then( (updatedUser) => {
                console.log("updated session", updatedUser.session);
                res.render('secure/profile', updatedUser)
                    
            })
            .catch((err) => console.log(err))    
})


router.post('/picture', parser.single('photo'), (req, res) => {
    const image_url = req.file.secure_url;

    User.findByIdAndUpdate({_id: req.session.currentUser._id}, {picture: image_url}, {new: true})
            .then( () => {
                res.render('secure/profile', req.session.currentUser)
            })
            .catch((err) => console.log(err))
})

module.exports = router;