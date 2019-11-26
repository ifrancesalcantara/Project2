const mongoose = require('mongoose');
const MapStyle = require('../../models/MapStyle');


// const dbName = hoody;

const maps = [
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Streets', require: true},
        url: {type: 'mapbox://styles/mapbox/streets-v10', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Outdoors', require: true},
        url: {type: 'mapbox://styles/mapbox/outdoors-v10', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Light', require: true},
        url: {type: 'mapbox://styles/mapbox/light-v9', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Dark', require: true},
        url: {type: 'mapbox://styles/mapbox/dark-v9', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Satellite', require: true},
        url: {type: 'mapbox://styles/mapbox/satellite-v9', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Satellite-Street', require: true},
        url: {type: 'mapbox://styles/mapbox/satellite-streets-v10', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Navigation preview day', require: true},
        url: {type: 'mapbox://styles/mapbox/navigation-preview-day-v2', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Navigation preview night', require: true},
        url: {type: 'mapbox://styles/mapbox/navigation-preview-night-v2', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Navigation guidance day', require: true},
        url: {type: 'mapbox://styles/mapbox/navigation-guidance-day-v2', require: true}
    },
    
    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: 'Navigation guidance night', require: true},
        url: {type: 'mapbox://styles/mapbox/navigation-guidance-night-v2', require: true}
    },

    {
        image: {type: './../public/images/blueprint.png', require: true},
        title: {Blueprint: String, require: true},
        url: {type: String, require: true}
    },

    {
        image: {type: './../public/images/bubble.png', require: true},
        title: {type: 'Bubble', require: true},
        url: {type: String, require: true}
    },
    {
        image: {type: './../public/images/decimal.png', require: true},
        title: {type: 'Dezimal', require: true},
        url: {type: String, require: true}
    },

    {
        image: {type: './../public/images/frank.png', require: true},
        title: {type: 'Frank', require: true},
        url: {type: String, require: true}
    },

    {
        image: {type: './../public/images/icecream.png', require: true},
        title: {type: 'Icecream', require: true},
        url: {type: String, require: true}
    },

    {
        image: {type: './../public/images/minimo.png', require: true},
        title: {type: 'Minimo', require: true},
        url: {type: String, require: true}
    },

    {
        image: {type: './../public/images/moonlight.png', require: true},
        title: {type: 'Moonlight', require: true},
        url: {type: String, require: true}
    },
    
    {
        image: {type: './../public/images/pencil.png', require: true},
        title: {type: 'Pencil', require: true},
        url: {type: String, require: true}
    }
]


//CONNECT DATABASE

mongoose.connect('mongodb://localhost:27017/hoody', {useNewUrlParser: true})
    .then(() => {
        return MapStyle.create(maps);
    })
    .then((insertedMaps) => {
        console.log('Inserted Maps:', insertedMaps.length);
        mongoose.connection.close()
    })
    .catch((err) => console.log(err))