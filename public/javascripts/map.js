const addCommentForm = document.querySelector(".add-comment-form");
const newCommentType2 = document.querySelector("#new-comment-type");
const privatePublicBtn2 = document.querySelector("#privatePublicBtn")



const imagesDiv = document.createElement("div");
const socialComment = document.createElement("img");
const sightComment = document.createElement("img");
const claimComment = document.createElement("img");

imagesDiv.classList.add("add-comment-form-img-div");
socialComment.classList.add("add-comment-form-img-social");
sightComment.classList.add("add-comment-form-img-sight");
claimComment.classList.add("add-comment-form-img-claim");

socialComment.setAttribute("src", "./images/public-marker-social-img.png");
sightComment.setAttribute("src", "./images/public-marker-sight-img.png");
claimComment.setAttribute("src", "./images/public-marker-claim-img.png");
// claimComment.addAttribute("src", );

imagesDiv.appendChild(socialComment)
imagesDiv.appendChild(sightComment)
imagesDiv.appendChild(claimComment)
addCommentForm.appendChild(imagesDiv);

socialComment.addEventListener("click", ()=>{
    newCommentType2.value = "social";
})
sightComment.addEventListener("click", ()=>{
    newCommentType2.value = "sight"
})
claimComment.addEventListener("click", ()=>{
    newCommentType2.value = "claim"
})


let goingToPlacePublicComment=true;
privatePublicBtn2.addEventListener("click", (e)=>{
    e.preventDefault()
    if(goingToPlacePublicComment){
        socialComment.setAttribute("src", "./images/private-marker-social-img.png");
        sightComment.setAttribute("src", "./images/private-marker-sight-img.png");
        claimComment.setAttribute("src", "./images/private-marker-danger-img.png");
        goingToPlacePublicComment=false;
    } else {
        socialComment.setAttribute("src", "./images/public-marker-social-img.png");
        sightComment.setAttribute("src", "./images/public-marker-sight-img.png");
        claimComment.setAttribute("src", "./images/public-marker-claim-img.png");
        goingToPlacePublicComment=true;
    }
})