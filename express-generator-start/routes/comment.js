const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{
    console.log("heree");

    if (req.session.currentUser) {
        res.render('secure/comment');
    }
})


router.post('/comment', (req, res) => {
    const  { title, text } =  req.body;

    Comment.create({ title, text })
})


module.exports = router;