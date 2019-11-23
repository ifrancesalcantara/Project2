const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{

    if (req.session.currentUser) {
        
        User.findOne({_id: req.session.currentUser._id}) //CHANGE WHEN TIME TO MATCHING
        .then( (user)=> {
            const userHomeLocation = user.defaultLocation;
            res.render('secure/map', userHomeLocation)
            })
        .catch(err=>console.log(err))
    } 
    else {
        res.render("index", {errorMessage: "Session ended."})
    }
})

module.exports = router;