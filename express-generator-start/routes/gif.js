const express = require('express');
const  router = express.Router();
const parser = require('../config/cloudinary');

const Comment = require('./../models/Comment');
const User = require('./../models/User');
const Gif = require('./../models/Gif');


router.post('/', parser.single('photo'), ( req, res) => {
    const image_url = req.file.secure_url;
    
    const newGif = new Gif({
        image_url
    })
    
    newGif.save({
    })
    
    
    .then( ( newGif) => {
        User.findById({_id: req.session.currentUser._id})
        console.log('////>>>>>>>>>>>>>>>>>///<<<<<<<<<<<<<<<// IMAGE', req.session.currentUser.profilePicture)
            .populate("profilePicture")
            .then( () => {
                User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {profilePicture: newGif._id}})
            })  
        
    })
    .then(()=> res.render('secure/profile', req.session.currentUser))
    .catch((err)=> console.log(err))
})


module.exports = router;