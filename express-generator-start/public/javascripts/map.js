
    const currentUser = document.querySelector("#currentUser").innerHTML
    const centerLong = document.querySelector("#userHomeLng").innerHTML
    const centerLat = document.querySelector("#userHomeLat").innerHTML
    const addCommentBtn = document.querySelector("#add-comment-btn");
    const client = new MapboxClient('pk.eyJ1IjoiaXZhbmZyYWwiLCJhIjoiY2szOTFzMm9pMGJteTNtcDI3aDJua2s5MSJ9.y5iUZoRKCEeCny5m2sJrlg');
    const map = document.querySelector("#map")
    const currentLocation = document.querySelector("#currentLocation").innerHTML
    const query=""
    const lastMarker = []
    var isAddCommentDisplayed = false;
    const newCommentUbication = document.querySelector("#newCommentUbication");
    const newCommentType = document.querySelector("#new-comment-type");


    //Set popup for Home Icon
    const popup = new mapboxgl.Popup()
    .setHTML(`<h3>Home</h3>`);

    const privatePublicBtn = document.querySelector("#privatePublicBtn")
    const privatePublicInput = document.querySelector("#privatePublicInput")
    privatePublicBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        if(privatePublicBtn.innerHTML == "Public"){
            privatePublicBtn.innerHTML = "Private"
            privatePublicInput.value = "Private"
        } else {
            privatePublicBtn.innerHTML = "Public"
            privatePublicInput.value = "Public"
        }
    })

    //Draw map
    client.geocodeForward(query, function(err, data, res) {
    mapboxgl.accessToken = "pk.eyJ1IjoiaXZhbmZyYWwiLCJhIjoiY2szOTFzMm9pMGJteTNtcDI3aDJua2s5MSJ9.y5iUZoRKCEeCny5m2sJrlg" //!!! .env

        //Map setup
        const map = new mapboxgl.Map({
            container: 'map', // HTML container id
            style: 'mapbox://styles/mapbox/streets-v9', // style URL
            center: [JSON.parse(currentLocation).lng.$numberDecimal, JSON.parse(currentLocation).lat.$numberDecimal],
            zoom: 13
        });

        //Add home marker
        /*const marker = new mapboxgl.Marker()
        .setLngLat([userHomeLong, userHomeLat])
        .setPopup(popup)
        .addTo(map);*/


        //Show current map center location
        var showLocation = setInterval(()=>{
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", `https://api.mapbox.com/geocoding/v5/mapbox.places/${map.getCenter().lng},${map.getCenter().lat}.json?proximity=-122.3995752,37.7881856&access_token=${mapboxgl.accessToken}`, false ); // false for synchronous request
            xmlHttp.send( null );
            const response = xmlHttp.responseText;
            const placeDisplay = document.querySelector(".currentMapCenter")
            
            const currentZoom=map.getZoom();

            let address
            let country
            let locality
            let street 
            let addressToDisplay


            JSON.parse(response).features.forEach((feature, index)=>{
                
                if(feature.place_type[0]=="address"){
                    address = feature.place_name
                }
                if(feature.place_type[0]=="country"){
                    country = feature.place_name
                } else {
                    const country = address.split(", ").pop()
                }
                if(feature.place_type[0]=="locality"){
                    locality = feature.place_name
                } else if (feature.place_type[0]=="city"){
                    locality = feature.place_name
                } else {
                    const country = address.split(", ")
                    country.pop()
                    locality=country.pop()
                    locality = locality.split(" ")
                    locality.shift()
                    locality = locality.join(" ")
                    if(!locality){
                        const country = address.split(", ")
                        country.pop()
                        locality=country.pop()
                        locality = locality.split(" ")
                        locality = locality.join(" ")
                    }
                }
                if(feature.place_type[0]=="neighborhood"){
                    neighborhood = feature.place_name
                } else {
                    const country = address.split(", ")
                    country.pop()
                    country.pop()
                    street=country.pop()
                    street = street.split(" ")
                    street.shift()
                    street = street.join(" ")
                }
            })

            //console.log(currentZoom, country, ", ", locality,", ", street, "<<<<<<<<<< ", address)
            
            if(currentZoom > 14){
                addressToDisplay = street
            } else if (currentZoom < 9) {
                addressToDisplay = country
            } else {
                addressToDisplay = locality
            }
            
            placeDisplay.innerHTML = addressToDisplay;

            newCommentUbication.value = JSON.stringify({country, locality, street})

        }, 2000)


        //Add selected location marker, set input values to coords
        map.on('click', function (e) {
            const newCommentLng = e.lngLat.wrap().lng
            const newCommentLat = e.lngLat.wrap().lat

            const newCommentLngInput = document.querySelector("#newCommentLng");
            const newCommentLatInput = document.querySelector("#newCommentLat");
            newCommentLngInput.value = newCommentLng
            newCommentLatInput.value = newCommentLat

            const markerOnClick = new mapboxgl.Marker()
                .setLngLat([newCommentLng, newCommentLat])
                .addTo(map);
            if(lastMarker[0]){
                lastMarker[0].remove();
                lastMarker.splice(0,1)
            }
            lastMarker.push(markerOnClick)
        });        

        //TO DO: Add comment icon should slide form 
        const addCommentIcon = document.querySelector(".add-img-plus");
        addCommentIcon.addEventListener("click",()=>{
            if(isAddCommentDisplayed){
                const commentForm = document.querySelector(".add-comment-form");
                commentForm.style.height = "0vh";
                isAddCommentDisplayed = false;
            }
            else {
                const commentForm = document.querySelector(".add-comment-form");
                commentForm.style.height = "10vh";
                isAddCommentDisplayed = true;
            }
        })

        //Declare Geojson to add markers through it in .forEach
        const geojson = {
            type: 'FeatureCollection',
            features: []
            };


        //Load all markers, popups and images
        const userComments = JSON.parse(document.querySelector("#userComments").innerHTML)
        userComments.forEach(comment=>{

            //Add location to Geojson
            var newMarkerIndex = geojson.features.push({
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [comment.comment.location.lng.$numberDecimal, comment.comment.location.lat.$numberDecimal]
                },
                properties: {
                title: `${comment.comment.title}`,
                description: `${comment.comment.text}`
                }
            })

            //Style comments accordingly in Geojson and create Markers
            if(comment.comment.type=="home") {
                let commentPopup
                if(JSON.parse(currentUser)==comment.comment.creatorId){
                    commentPopup = new mapboxgl.Popup()
                        .setHTML(`<div class="home-marker"><h3>Home</h3><button>Move</button></div>`);
                }

                var el = document.createElement('div');
                el.className = 'home-marker'

                new mapboxgl.Marker(el)
                    .setLngLat(geojson.features[newMarkerIndex-1].geometry.coordinates)
                    .setPopup(commentPopup)
                    .addTo(map);

            } else if(comment.comment.public==true) {
                let commentPopup
                if(JSON.parse(currentUser)==comment.comment.creatorId){
                    commentPopup = new mapboxgl.Popup()
                        .setHTML(`<div class="public-marker"><h3>${comment.comment.title}</h3><p>${comment.comment.text}</p><form action="/comment/delete/${comment.comment._id}" method="POST"><button>Delete</button></form><form action="/comment/${comment.comment._id}" method="GET"><button type="submit">See details</button></form></div>`);
                } else {
                    commentPopup = new mapboxgl.Popup()
                        .setHTML(`<div class="public-marker"><h3>${comment.comment.title}</h3><p>${comment.comment.text}</p><form action="/comment/${comment.comment._id}" method="GET"><button type="submit">See details</button></form></div>`);
                }
                
                var el = document.createElement('div');
                el.className = 'public-marker'

                new mapboxgl.Marker(el)
                    .setLngLat(geojson.features[newMarkerIndex-1].geometry.coordinates)
                    .setPopup(commentPopup)
                    .addTo(map);
            } else {
                let commentPopup
                if(JSON.parse(currentUser)==comment.comment.creatorId){
                    commentPopup = new mapboxgl.Popup()
                        .setHTML(`<div class="private-marker"><h3>${comment.comment.title}</h3><p>${comment.comment.text}</p><form action="/comment/delete/${comment.comment._id}" method="POST"><button>Delete</button></form><form action="/comment/${comment.comment._id}" method="GET"><button type="submit">See details</button></form></div>`);
                } else {
                    commentPopup = new mapboxgl.Popup()
                        .setHTML(`<div class="private-marker"><h3>${comment.comment.title}</h3><p>${comment.comment.text}</p><form action="/comment/${comment.comment._id}" method="GET"><button type="submit">See details</button></form></div>`);
                }
                
                var el = document.createElement('div');
                el.className = 'private-marker'

                new mapboxgl.Marker(el)
                    .setLngLat(geojson.features[newMarkerIndex-1].geometry.coordinates)
                    .setPopup(commentPopup)
                    .addTo(map);
            }
        })
    });