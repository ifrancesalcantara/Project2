const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get('/comment', (req, res) => {
    
    if (req.session.currentUser){
        console.log('session');
    }
    res.render('secure/comment')
})

router.post('/comment', (req, res) => {
    const  { title, text } =  req.body;

    Comment.create({ title, text })
})


module.exports = router;