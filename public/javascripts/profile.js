
    var client = new MapboxClient('pk.eyJ1IjoiaXZhbmZyYWwiLCJhIjoiY2szOTFzMm9pMGJteTNtcDI3aDJua2s5MSJ9.y5iUZoRKCEeCny5m2sJrlg');
    const lastMarker = []
    const map = document.querySelector("#profile-map")
    const query=""
    const commentTitle = "Ironhack";
    const commentText = "A good school.";
    var userHomeLong= 2.190471916
    var userHomeLat= 41.3977381
    var popup = new mapboxgl.Popup()
    .setHTML(`<h3>${commentTitle}</h3><p>${commentText}</p>`);

    map.style.height="20vh";
    map.style.width="500px";

    //Set map center according to GPS allowance
    if(document.querySelector("#lng").innerHTML){
        userHomeLong = document.querySelector("#lng").innerHTML
    }
    if(document.querySelector("#lat").innerHTML){
        userHomeLat = document.querySelector("#lat").innerHTML
    }


    //Display map centered on user geolocation, with a marker that says you are here.


    client.geocodeForward(query, function(err, data, res) {
    mapboxgl.accessToken = "pk.eyJ1IjoiaXZhbmZyYWwiLCJhIjoiY2szOTFzMm9pMGJteTNtcDI3aDJua2s5MSJ9.y5iUZoRKCEeCny5m2sJrlg" //!!! .env
        
        var map = new mapboxgl.Map({
            container: 'profile-map', // HTML container id
            style: 'mapbox://styles/mapbox/streets-v9', // style URL
            center: [userHomeLong, userHomeLat],    //This should be the geolocation
            zoom: 12
        });

        //Add selected location marker, set input values to coords
        map.on('click', function (e) {
            document.getElementById('info').innerHTML =
            JSON.stringify(e.lngLat.wrap());
            var userHomeCoords = document.getElementById('info').innerHTML
            document.querySelector("#location-input").value=userHomeCoords
            
            const newCommentLng = e.lngLat.wrap().lng
            const newCommentLat = e.lngLat.wrap().lat

            const markerOnClick = new mapboxgl.Marker()
                .setLngLat([newCommentLng, newCommentLat])
                .addTo(map);
            if(lastMarker[0]){
                lastMarker[0].remove();
                lastMarker.splice(0,1)
            }
            lastMarker.push(markerOnClick)
        });
    });

    function showPassword  () {
                    const passShow = document.getElementById('passShow')

                    if ( passShow.type === 'password' && passConfShow.type === 'password') 
                    {
                        passShow.type = 'text';
                        passConfShow.type = 'text';
                    }
                    else 
                    {
                        passShow.type = 'password';
                        passConfShow.type = 'password'
                    }
            }

    var sessionChangeBtn = document.querySelector("#sessionChangeBtn")
    sessionChangeBtn.addEventListener("click", (e)=>{
        if(e.target.innerHTML=="Public"){
            e.target.innerHTML="Private"
            document.querySelector("#sessionChangeInput").value="Public"
        } else {
            e.target.innerHTML="Public"
            document.querySelector("#sessionChangeInput").value="Private"
        }
    })
    