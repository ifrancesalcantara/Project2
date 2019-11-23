const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');

const zxcvbn = require("zxcvbn");
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.get("/", (req, res)=>{
    const currentUser = req.session.currentUser;
    //console.log('>>>>>>>>>>>>>>>>>>///>>>>>>>>>>>>>', currentUser.username);
    

        if (req.session.currentUser) {
            
        res.render('secure/profile', currentUser);
    } 
    else {
        res.render("index", {errorMessage: "Session ended."})
    }
})


router.post('/', (req, res) => {
    const _id = req.session.currentUser._id;
    const   {password, passConf}  =  req.body;
    const currentUser = req.session.currentUser;
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    

    if ( password === '' ) {
        res.render('secure/profile', {errorMessage: "Password cant be empty", currentUser})
    }
    else if (password != passConf) {
        res.render('secure/profile', {errorMessage: "Password and Password Confirm must be the same", currentUser})
    }
    else if (password.split('').length < 8) {
        res.render('secure/profile', {errorMessage: "Password must be at least 8 characters long", currentUser})
    }
    else 
    {
        User.findByIdAndUpdate({_id: _id}, {password: hashedPassword}, {new: true})
            .then( () => {
                    res.render('secure/map')
            })
            .catch((err) => console.log(err))
    }
})


module.exports = router;