const allCommentData = document.querySelector("#allCommentData")
    const allDiscoverComments = document.querySelector("#allDiscoverComments")
    const currentUserId = document.querySelector("#currentUserId");
    const discoverLabel = document.querySelector("#discoverLabel");
    const allMyComments = document.querySelector("#allMyComments");
    const myCommentsLabel = document.querySelector("#myCommentsLabel");

    console.log(currentUserId.innerHTML)


    let publicComments = 0
    let privateComments = 0
    let myComments = 0
    let othersComments = 0


    JSON.parse(allCommentData.innerHTML).forEach(comment=>{
        const commentDiv = document.createElement("div")
        commentDiv.setAttribute("class", "displayedComment")

        //Set image
        let imageSrc
        if(comment.type == "home") {
            imageSrc = "./images/home-marker-img.png"
        } else if(comment.public == true) {
            imageSrc = "./images/marker_template.png"
        } else if(comment.public == false) {
            imageSrc = "./images/private-marker-img.png"
        }

        if(comment.public == true) {
            publicComments ++
            if(comment.creatorId == currentUserId.innerHTML) {
                myComments++            
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><img class= "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                }
            } else {
                othersComments++;
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><img class= "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allDiscoverComments.appendChild(commentDiv)
                }
            }
        } else {
            privateComments++;
            if(comment.type == "home") {
            } else if(comment.creatorId == currentUserId.innerHTML) {       
                if(comment.text) {
                    commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-text">${comment.text}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                } else {
                    commentDiv.innerHTML= (`<div><img class = "displayedComment" src=${imageSrc}></div><p class="displayed-comment-title">${comment.title}</p><p class="displayed-comment-creator-username">${comment.creatorUsername}</p>`).trim()
                    allMyComments.appendChild(commentDiv)
                }
            }
        }


    })
    
    allMyComments.classList.add("hidden")

    myCommentsLabel.addEventListener("click", (e)=>{
        console.log("HIIIIIII")
        allMyComments.classList.remove("hidden")
        allDiscoverComments.classList.add("hidden");
        console.log("allDiscoverComments.hidden: ", allDiscoverComments.classList)
    })



    discoverLabel.addEventListener("click",(e)=>{
        allDiscoverComments.classList.remove("hidden")
        allMyComments.classList.add("hidden")
        console.log("allDiscoverComments.hidden: ", allDiscoverComments.classList)
    })



    console.log("public", publicComments, "private: ", privateComments, "mine: ", myComments, "other ppl's: ", othersComments)