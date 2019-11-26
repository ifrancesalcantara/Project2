function showPassword  () {
    const passShow = document.getElementById('passShow')

    if ( passShow.type === 'password')
    {
        passShow.type = 'text';
    }
    else 
    {
        passShow.type = 'password';
    }
}

//GET current position by GPS for the form in signup
navigator.geolocation.getCurrentPosition(function(position) {
document.querySelector("#signup-lng").value = position.coords.longitude
document.querySelector("#signup-lat").value = position.coords.latitude
});
