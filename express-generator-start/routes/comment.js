const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');


router.post('/comment', (req, res) => {
    const  { title, text } =  req.body;

    Comment.create({ title, text })
})


module.exports = router;