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
                            if(comment.public == false) {
                                if(comment.creatorId == req.session.currentUser._id){
                                    allUserComments.push(comment)
                                }
                            } else {
                                allUserComments.push(comment)
                            }
                        })
                    })
                    userComments = allUserComments.map(comment=> {return {comment}})
                    const currentLocation = {
                        lng: {$numberDecimal: userData.defaultLocation.lng},
                        lat: {$numberDecimal: userData.defaultLocation.lat},
                    }
                    const data = {
                        homeCoords: userData.defaultLocation,
                        currentLocation: JSON.stringify(currentLocation),
                        userComments: JSON.stringify(userComments),
                        currentUser: JSON.stringify(userData._id),
                        mapStyle: userData.mapStyle
                    }
                    res.render("secure/map", data)
                })
                .catch( (err) => console.log(err));
            } else {
                const currentLocation = {
                    lng: {$numberDecimal: userData.defaultLocation.lng},
                    lat: {$numberDecimal: userData.defaultLocation.lat},
                }
                userComments = userData.comments.map(comment=> {return {comment}})
                const data = {
                    homeCoords: userData.defaultLocation,
                    currentLocation: JSON.stringify(currentLocation),
                    userComments: JSON.stringify(userComments),
                    currentUser: JSON.stringify(userData._id),
                    mapStyle: userData.mapStyle
                }
                res.render("secure/map", data)
            }
        }) 
    } else {
        res.render("index", {errorMessage: "Session ended."})
    }
})

module.exports = router;