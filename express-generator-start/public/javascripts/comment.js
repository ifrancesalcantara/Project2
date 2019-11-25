    const dateInput = document.querySelector("#replyDate")
    const dateDisplayed = document.querySelectorAll(".replyDateDisplayed")
    const currentUser = document.querySelector("#currentUser").innerHTML
    const allReplyUsernames = document.querySelectorAll(".creatorUsername")
    const commentCreatorUsername = document.querySelector("#commentCreatorUsername").value
    const replyIds = document.querySelectorAll(".replyId")
    const commentId = document.querySelector("#commentId").innerHTML
    

    dateInput.value = new Date()

    //Create Delete comment button if user is the creator
    if(currentUser === commentCreatorUsername) {
        const deleteCommentDiv = document.createElement("div")
            deleteCommentDiv.innerHTML= (`<form method="POST" action="/comment/delete/${commentId}"><button type="submit">Delete comment</button></form>`).trim()
            document.querySelector("main").insertBefore(deleteCommentDiv, document.querySelector("#commentTitle"))
    }
    
    //Modify reply date appearance and add reply deletion button  
    dateDisplayed.forEach((dateDisplayed, index)=>{
        var dateToDisplay = dateDisplayed.innerHTML.split(" ")
        dateToDisplay.splice(0, 1)
        dateToDisplay.splice(3)
        dateDisplayed.innerHTML = dateToDisplay    

        console.log(currentUser, "vs ", allReplyUsernames[index].innerHTML)
        if(currentUser === allReplyUsernames[index].innerHTML) {
            const deleteDiv = document.createElement("div")
            deleteDiv.innerHTML= (`<form method="POST" action="/reply/delete/${replyIds[index].innerHTML}/${commentId}"><button type="submit">Delete</button></form>`).trim()
            dateDisplayed.appendChild(deleteDiv)
        }
    })