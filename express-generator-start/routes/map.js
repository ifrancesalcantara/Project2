const express = require('express');
const  router = express.Router();

const Comment = require('./../models/Comment');
const User = require('./../models/User');


router.get("/", (req, res)=>{

    if (req.session.currentUser) {
        
        User.findOne({_id: req.session.currentUser._id}) //CHANGE WHEN TIME TO MATCHING
        .populate("comments")
        .then( (userData)=> {
            let userComments
                
            if(userData.session=="Public") {
                const allUserComments = [];                
                User.find({})
                .populate("comments")
                .then( (allUsersArr) => {
                    allUsersArr.forEach(user=>{
                        user.comments.forEach(comment=>{
                            allUserComments.push(comment)
                        })
                    })
                    userComments = allUserComments.map(comment=> {return {comment}})
                    const data = {
                        homeCoords: userData.defaultLocation,
                        userComments: JSON.stringify(userComments)
                    }
                    res.render("secure/map", data)
                })
                .catch( (err) => console.log(err));
            } else {
                
                userComments = userData.comments.map(comment=> {return {comment}})
                const data = {
                    homeCoords: userData.defaultLocation,
                    userComments: JSON.stringify(userComments)
                }
                res.render("secure/map", data)
            }
        }) 
    } else {
        res.render("index", {errorMessage: "Session ended."})
    }
})

module.exports = router;