const mongoose = require('mongoose');
const maps = require('./../models/MapStyle');


const dbName = hoody;

const maps = [
    {
        image: {type: './../public/images/blueprint.png', require: true},
        mapName: {Blueprint: String, require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/bubble.png', require: true},
        mapName: {type: 'Bubble', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/decimal.png', require: true},
        mapName: {type: 'Dezimal', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/frank.png', require: true},
        mapName: {type: 'Frank', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/icecream.png', require: true},
        mapName: {type: 'Icecream', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/minimo.png', require: true},
        mapName: {type: 'Minimo', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/moonlight.png', require: true},
        mapName: {type: 'Moonlight', require: true},
        mapLink: {type: String, require: true}
    },
    {
        image: {type: './../public/images/pencil.png', require: true},
        mapName: {type: 'Pencil', require: true},
        mapLink: {type: String, require: true}
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