const dateInput = document.querySelector("#replyDate")
const dateDisplayed = document.querySelectorAll(".replyDateDisplayed")
const currentUser = document.querySelector("#currentUser").innerHTML
const allReplyUsernames = document.querySelectorAll(".creatorUsername")
const commentCreatorUsername = document.querySelector("#commentCreatorUsername").value
const replyIds = document.querySelectorAll(".replyId")
const commentId = document.querySelector("#commentId").innerHTML

dateInput.value = new Date()

//Create Delete comment button if user is the creator
console.log('currentUser === commentCreatorUsername', currentUser === commentCreatorUsername);

if(currentUser === commentCreatorUsername) {
    const deleteCommentDiv = document.createElement("div")
        deleteCommentDiv.innerHTML= (`<form method="POST" action="/comment/delete/${commentId}"><button class="comment-view-comment-trash" type="submit"><img src="../../../../images/trash.png"></button></form>`).trim()
        document.querySelector(".comment-view-author-and-like").insertBefore(deleteCommentDiv, document.querySelector(".author-in-comment-view"))
}

//Modify reply date appearance and add reply deletion button  
dateDisplayed.forEach((dateDisplayed, index)=>{
    var dateToDisplay = dateDisplayed.innerHTML.split(" ")
    console.log(dateDisplayed.innerHTML)
    dateToDisplay.splice(0, 1)
    dateToDisplay.splice(3)
    dateDisplayed.innerHTML = dateToDisplay.join(" ") + " " + dateDisplayed.innerHTML.split(" ")[4]    

    //console.log(currentUser, "vs ", allReplyUsernames[index].innerHTML)
    if(currentUser === allReplyUsernames[index].innerHTML) {
        const deleteDiv = document.createElement("div")
        deleteDiv.innerHTML= (`<form method="POST" action="/reply/delete/${replyIds[index].innerHTML}/${commentId}"><button class="comment-view-reply-trash" type="submit"><img src="../../../../images/trash.png"></button></form>`).trim()
        dateDisplayed.appendChild(deleteDiv)
    }
})



const replies = document.querySelector("#replies")
const like = document.querySelector(".comment-view-like-div")
const currentUser2 = document.querySelector("#currentUser").innerHTML
const commentId2 = document.querySelector("#commentId").innerHTML
const currentLikes = document.querySelector("#current-likes").innerHTML
const likesAndAuth = document.querySelector(".comment-view-author-and-like")
const keepTheLikesWhenReplying = document.querySelector("#keepTheLikesWhenReplying")

const totalLikes = document.createElement("span")
const likeBtn = document.createElement("button")
const likeForm = document.createElement("form")
const likeImg = document.createElement("img")

var alreadyLiked = false

totalLikes.classList.add("comment-view-total-likes")
likeBtn.classList.add("like-btn")
likeImg.classList.add("like-img")

likeImg.setAttribute("src", "./../../../images/like.png")
likeForm.setAttribute("action", `/comment/like/${commentId2}/${currentUser2}`)
likeForm.setAttribute("method", `POST`)

//provisional
totalLikes.innerHTML = currentLikes

like.appendChild(totalLikes)
likeBtn.appendChild(likeImg)
likeForm.appendChild(likeBtn)
like.appendChild(likeForm)

keepTheLikesWhenReplying.value = currentLikes;