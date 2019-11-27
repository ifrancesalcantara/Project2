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
socialComment.classList.add("white-background-add-comment-img");
sightComment.classList.add("white-background-add-comment-img");
claimComment.classList.add("white-background-add-comment-img");

socialComment.setAttribute("src", "./images/public-marker-social-img.png");
sightComment.setAttribute("src", "./images/public-marker-sight-img.png");
claimComment.setAttribute("src", "./images/public-marker-claim-img.png");
// claimComment.addAttribute("src", );

imagesDiv.appendChild(socialComment)
imagesDiv.appendChild(sightComment)
imagesDiv.appendChild(claimComment)
addCommentForm.appendChild(imagesDiv);

socialComment.addEventListener("click", ()=>{
    socialComment.classList.toggle("bigger-icon-in-map-add-comment")
    sightComment.classList.remove("bigger-icon-in-map-add-comment")
    claimComment.classList.remove("bigger-icon-in-map-add-comment")
    sightComment.classList.add("smaller-icon-in-map-add-comment")
    claimComment.classList.add("smaller-icon-in-map-add-comment")
    if(newCommentType2.value != "social") {
        newCommentType2.value = "social";
    } else {
        newCommentType2.value = "";
    }
})
sightComment.addEventListener("click", ()=>{
    socialComment.classList.remove("bigger-icon-in-map-add-comment")
    sightComment.classList.toggle("bigger-icon-in-map-add-comment")
    claimComment.classList.remove("bigger-icon-in-map-add-comment")
    socialComment.classList.add("smaller-icon-in-map-add-comment")
    claimComment.classList.add("smaller-icon-in-map-add-comment")
    if(newCommentType2.value != "sight") {
        newCommentType2.value = "sight";
    } else {
        newCommentType2.value = "";
    }
})
claimComment.addEventListener("click", ()=>{
    socialComment.classList.remove("bigger-icon-in-map-add-comment")
    sightComment.classList.remove("bigger-icon-in-map-add-comment")
    claimComment.classList.toggle("bigger-icon-in-map-add-comment")
    sightComment.classList.add("smaller-icon-in-map-add-comment")
    socialComment.classList.add("smaller-icon-in-map-add-comment")
    if(newCommentType2.value != "claim") {
        newCommentType2.value = "claim";
    } else {
        newCommentType2.value = "";
    }
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