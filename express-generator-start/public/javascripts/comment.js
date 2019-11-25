const replies = document.querySelector("#replies")
const like = document.querySelector(".like")
const currentUser2 = document.querySelector("#currentUser").innerHTML
const commentId2 = document.querySelector("#commentId").innerHTML

const totalLikes = document.createElement("span")
const likeBtn = document.createElement("button")
const likeForm = document.createElement("form")
const likeImg = document.createElement("img")

var alreadyLiked = false

likeBtn.classList.add("like-btn")
likeImg.classList.add("like-img")

likeImg.setAttribute("src", "../images/like.png")
likeForm.setAttribute("action", `/comment/like/${commentId2}/${currentUser2}`)
likeForm.setAttribute("method", `GET`)

//provisional
totalLikes.innerHTML=0

like.appendChild(totalLikes)
likeBtn.appendChild(likeImg)
likeForm.appendChild(likeBtn)
like.appendChild(likeForm)


likeBtn.addEventListener("click", (e)=>{
    if(!alreadyLiked){
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML)+1;
        alreadyLiked = true;
        
        
    } else {
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML)-1;
        alreadyLiked = false;
    }
})
 
