const express = require('express');
const  router = express.Router();
const parser = require('../config/cloudinary');

const Comment = require('./../models/Comment');
const User = require('./../models/User');
const Gif = require('./../models/Gif');


router.post('/', parser.single('photo'), ( req, res) => {
    const image_url = req.file.secure_url;
    const currentUser = req.session.currentUser;
    console.log('////>>>>>>>>>>>>>>>>>///<<<<<<<<<<<<<<<// IMAGE', image_url);

    const newGif = new Gif({
        image_url
    })

    

    newGif.save({
    })
    .then(()=> res.render('secure/profile', currentUser))
    .catch((err)=> console.log(err))
})


module.exports = router;