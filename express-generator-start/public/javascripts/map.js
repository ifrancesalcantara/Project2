console.log("hi");
const addCommentForm = document.querySelector(".add-comment-form")



const imagesDiv = document.createElement("div");
const socialComment = document.createElement("img");
const sightComment = document.createElement("img");
const claimComment = document.createElement("img");
imagesDiv.classList.add("add-comment-form-img-div");
socialComment.classList.add("add-comment-form-img-social");
sightComment.classList.add("add-comment-form-img-sight");
claimComment.classList.add("add-comment-form-img-claim");
imagesDiv.appendChild(socialComment)
imagesDiv.appendChild(sightComment)
imagesDiv.appendChild(claimComment)
addCommentForm.appendChild(imagesDiv)