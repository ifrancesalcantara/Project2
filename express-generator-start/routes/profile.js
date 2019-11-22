const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{

    if (req.session.currentUser) {
        res.render('secure/profile');
    } 
    else {
        res.render("index", {errorMessage: "Session ended."})
    }
})


router.post('/profile', (req, res) => {
    const  { title, text } =  req.body;

    Comment.create({ title, text })
})


module.exports = router;