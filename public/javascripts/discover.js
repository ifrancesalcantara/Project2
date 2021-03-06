// const allCommentData = document.querySelector("#allCommentData")
//     const allDiscoverComments = document.querySelector("#allDiscoverComments")
//     const currentUserId = document.querySelector("#currentUserId");
//     const discoverLabel = document.querySelector("#discoverLabel");
//     const allMyComments = document.querySelector("#allMyComments");
//     const myCommentsLabel = document.querySelector("#myCommentsLabel");

//     console.log(currentUserId.innerHTML)


//     let publicComments = 0
//     let privateComments = 0
//     let myComments = 0
//     let othersComments = 0


//     JSON.parse(allCommentData.innerHTML).forEach(comment=>{
//         const commentDiv = document.createElement("div")
//         commentDiv.setAttribute("class", "displayedComment")

//         //Set image
//         let imageSrc
//         if(comment.type == "home") {
//             imageSrc = "./images/home-marker-img.png"
//         } else if(comment.public == true) {
//             imageSrc = "./images/marker_template.png"
//         } else if(comment.public == false) {
//             imageSrc = "./images/private-marker-img.png"
//         }

//         if(comment.public == true) {
//             publicComments ++
//             if(comment.creatorId == currentUserId.innerHTML) {
//                 myComments++            
//                 if(comment.text) {
//                     commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allMyComments.appendChild(commentDiv)
//                 } else {
//                     commentDiv.innerHTML= (`<div><img class= "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allMyComments.appendChild(commentDiv)
//                 }
//             } else {
//                 othersComments++;
//                 if(comment.text) {
//                     commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allDiscoverComments.appendChild(commentDiv)
//                 } else {
//                     commentDiv.innerHTML= (`<div><img class= "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allDiscoverComments.appendChild(commentDiv)
//                 }
//             }
//         } else {
//             privateComments++;
//             if(comment.type == "home") {
//             } else if(comment.creatorId == currentUserId.innerHTML) {       
//                 if(comment.text) {
//                     commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allMyComments.appendChild(commentDiv)
//                 } else {
//                     commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
//                     allMyComments.appendChild(commentDiv)
//                 }
//             }
//         }


//     })
    
//     allMyComments.classList.add("hidden")

//     myCommentsLabel.addEventListener("click", (e)=>{
//         allMyComments.classList.remove("hidden")
//         allDiscoverComments.classList.add("hidden");
//     })



//     discoverLabel.addEventListener("click",(e)=>{
//         allDiscoverComments.classList.remove("hidden")
//         allMyComments.classList.add("hidden")
//     })



//     console.log("public", publicComments, "private: ", privateComments, "mine: ", myComments, "other ppl's: ", othersComments)


    const allCommentData = document.querySelector("#allCommentData")
    const allDiscoverComments = document.querySelector("#allDiscoverComments")
    const currentUserId = document.querySelector("#currentUserId");
    const discoverLabel = document.querySelector("#discoverLabel");
    const allMyComments = document.querySelector("#allMyComments");
    const myCommentsLabel = document.querySelector("#myCommentsLabel");
    const myCommentsFresh = document.querySelector("#myCommentsFresh");
    const myDiscoverCommentsFresh = document.querySelector("#myDiscoverCommentsFresh");

    let publicComments = 0
    let privateComments = 0
    let myComments = 0
    let othersComments = 0

    const allComments = []

    JSON.parse(allCommentData.innerHTML).forEach(comment=>{
        const commentDiv = document.createElement("div")
        commentDiv.setAttribute("class", "displayedComment")
        allComments.push(comment)

        //Set image
        let imageSrc
        if(comment.type == "home") {
            imageSrc = "./images/home-marker-img.png"
        } else if(comment.public == true) {
            if(comment.type == "social"){
                imageSrc = "./images/public-marker-social-img.png"
            } else if (comment.type == "sight") {
                imageSrc = "./images/public-marker-sight-img.png"
            } else if (comment.type == "claim") {
                imageSrc = "./images/public-marker-claim-img.png"
            } else {
                imageSrc = "./images/public-marker-generic-img.png"
            }
        } else if(comment.public == false) {
            if (comment.type == "social") {
                imageSrc = "./images/private-marker-social-img.png"
            } else if (comment.type == "sight") {
                imageSrc = "./images/private-marker-sight-img.png"
            } else if (comment.type == "claim") {
                imageSrc = "./images/private-marker-danger-img.png"
            } else {
                imageSrc = "./images/private-marker-generic-img.png"
            }
        }

        if(comment.public == true) {
            publicComments ++
            if(comment.creatorId == currentUserId.innerHTML) {
                myComments++            
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class= "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                }
            } else {
                othersComments++;
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a><a href="/comment/${comment._id}"></div><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class= "displayedComment" src=${imageSrc}></a><a href="/comment/${comment._id}"></div><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverComments.appendChild(commentDiv)
                }
            }
        } else {
            privateComments++;
            if(comment.type == "home") {
            } else if(comment.creatorId == currentUserId.innerHTML) {       
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                }
            }
        }
    })

    var freshAllComments = allComments
    .filter(comment=>{return comment.type!="home"&&comment.date})
    freshAllComments = freshAllComments.sort((a, b)=> {
        if (a.date > b.date) {
            return 1;
        } else {
            return -1
        }
    })


    freshAllComments.forEach(comment=>{
        const commentDiv = document.createElement("div")
        commentDiv.setAttribute("class", "displayedComment")

        //Set image
        let imageSrc
        if(comment.public == true) {
            if(comment.type == "social"){
                imageSrc = "./images/social.jpg"
            } else if (comment.type == "sight") {
                imageSrc = "./images/sight.png"
            } else {
                imageSrc = "./images/marker_template.png"
            }
        } else if(comment.public == false) {
            if (comment.type == "social") {
                imageSrc = "./images/social.jpg"
            } else if (comment.type == "sight") {
                imageSrc = "./images/sight.png"
            } else {
                imageSrc = "./images/private-marker-img.png"
            }
        }

        if(comment.public == true) {
            publicComments ++
            if(comment.creatorId == currentUserId.innerHTML) {
                myComments++            
                if(comment.text) {
                    commentDiv.innerHTML= (`
                    <div>
                        <a href="/comment/${comment._id}">
                            <img class = "displayedComment" src=${imageSrc}>
                        </a>
                    </div>
                    <a href="/comment/${comment._id}">
                        <p class="displayed-comment-title">${comment.title}</p>
                    </a>
                    <p class="displayed-comment-text">${comment.text}</p>
                    <p class="displayed-comment-creator-username">${comment.creatorUsername}</p>
                    `).trim()
                    allMyCommentsFresh.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class= "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyCommentsFresh.appendChild(commentDiv)
                }
            } else {
                othersComments++;
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a><a href="/comment/${comment._id}"></div><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverCommentsFresh.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class= "displayedComment" src=${imageSrc}></a><a href="/comment/${comment._id}"></div><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverCommentsFresh.appendChild(commentDiv)
                }
            }
        } else {
            privateComments++;
            if(comment.type == "home") {
            } else if(comment.creatorId == currentUserId.innerHTML) {       
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyCommentsFresh.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><a href="/comment/${comment._id}"><img class = "displayedComment" src=${imageSrc}></a></div><a href="/comment/${comment._id}"><p class="displayed-comment-title">${comment.title}</p></a><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyCommentsFresh.appendChild(commentDiv)
                }
            }
        }
    })

    
    allMyComments.classList.add("hidden")
    allMyCommentsFresh.classList.add("hidden")
    allDiscoverCommentsFresh.classList.add("hidden")

    myCommentsLabel.addEventListener("click", (e)=>{
        allMyComments.classList.remove("hidden")
        allDiscoverComments.classList.add("hidden");
    })



    discoverLabel.addEventListener("click",(e)=>{
        allDiscoverComments.classList.remove("hidden")
        allMyComments.classList.add("hidden")
    })

    

    //console.log("public", publicComments, "private: ", privateComments, "mine: ", myComments, "other ppl's: ", othersComments)